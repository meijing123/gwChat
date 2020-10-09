const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    place_index: 0,
    teacher_index: 0,
    teachers: [],
    places: [],
    result: [],
    calendar: [],
    width:0,
    currentIndex:0,
    currentTime:0,
    timeArr:[],
    date1:"",
    temp_booktime:[],

  },
  onLoad: function (options) {
    wx.removeStorageSync('bookTable');
    var that = this
    this.getTeachers();
    this.getPlaces();
    this.getTimes();
    this.TodayDate();
    function getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
     }
   
  function getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
   }
   var date = new Date();
   var  cur_year = date.getFullYear();
   var cur_month = date.getMonth() + 1;
   if(cur_month<= '9' && cur_month >= '1'){
     cur_month = "0"+cur_month
   }
  var cur_date=date.getDate();
  if(cur_date <= '9' && cur_date >= '1'){
    cur_date = "0" + cur_date
  }
   const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
   //利用构造函数创建对象
   function calendar(date,week){
     if(date <= '9' && date >= '1')
     {
       date = "0"+date
     }
    this.date=cur_year+'-'+cur_month+'-'+date;
    if(date==cur_date){
     this.week = "今天";
    }else if(date==cur_date+1){
     this.week = "明天";
    }else{
     this.week = '星期' + week;
    }
   }
   //当前月份的天数
   var monthLength= getThisMonthDays(cur_year, cur_month)
   //当前月份的第一天是星期几
   var week = getFirstDayOfWeek(cur_year, cur_month)
   var x = week;
   for(var i=1;i<=monthLength;i++){
    //当循环完一周后，初始化再次循环
    if(x>6){
     x=0;
    }
    //利用构造函数创建对象
    that.data.calendar[i] = new calendar(i, [weeks_ch[x]][0])
    x++;
   }
   //限制要渲染的日历数据天数为7天以内（用户体验）
   var flag = that.data.calendar.splice(cur_date, that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length:7)
   that.setData({
    calendar: flag
   })
   //设置scroll-view的子容器的宽度
   that.setData({
    width: 186 * parseInt(that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length : 7)
   })
  },
  onPullDownRefresh:function(){
    var username = wx.getStorageSync('username');
    var password = wx.getStorageSync('password');
    getApp().login(username,password);
    wx.stopPullDownRefresh();
  },
 
  select:function(event){

    
    //为上半部分的点击事件
    this.setData({
     currentIndex: event.currentTarget.dataset.index,
     date1:event.currentTarget.dataset.date
    })
    this.showBook()

   },
   selectTime:function(event){
     var that = this
    //为下半部分的点击事件 
    this.setData({
     currentTime: event.currentTarget.dataset.index
    });
    this.getSaveResult();
  },
  getSaveResult(){
    var temp_result = []
    var temp_storage = wx.getStorageSync('bookTable');
    if(temp_storage.length != 0){
        temp_result = temp_storage
    }else{
        temp_result = []
    }
   
    if(this.data.timeArr[this.data.currentTime].flag == "0"){
      wx.showToast({
        title: '已被预约',
        icon:'none',
        duration:1000
      })
    }else{
      var that = this
      wx.showModal({
        title:'提示',
        content:'确认预约该时间段!',
        success(res){
          if(res.confirm){
          that.data.timeArr[that.data.currentTime].color = "bg-gray";
          that.data.timeArr[that.data.currentTime].chosen = "disabled";

          that.setData({
            timeArr:that.data.timeArr
          }) 
       
            var temp = {"start_time":"00:00","end_time":"00:00"};
            temp.start_time = that.data.temp_booktime[that.data.currentTime].start_time;
            temp.end_time  = that.data.temp_booktime[that.data.currentTime].end_time;
            temp_result.push(temp)
            wx.setStorageSync('bookTable',temp_result);
        
          }else{

          }
        }
      })
    }
  },
  TodayDate:function(){

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    var today = Y + "-" + M + "-" + D;
    this.setData({
     date1:today
    })
  },
  
  placeChange(e) {
    this.setData({
      place_index: e.detail.value
    });
    this.getPalceBook();
  },
  getPalceBook(){
    var that = this
    wx.request({
      url: 'https://www.shutest.top/HXJD/WeChat/getBook',
      data:{place_name:this.data.places[this.data.place_index].name},
      header:getApp().globalData.header,
      method:'POST',
      dataType:'json',
      success:function(res){
        that.setData({
          result:res.data
        })
        that.showBook();
        
      }
    });
  },

  teacherChange(e) {
    this.setData({
      teacher_index: e.detail.value
    })

  },


  DateChange(e) {
    this.setData({
      date: e.detail.value
    })

  },

  getTeachers: function () {
    var temp = []
    var that = this
    wx.request({
      url: 'https://www.shutest.top/HXJD/WeChat/getTeacher',
      header: getApp().globalData.header,
      dataType: 'json',
      success: function (res) {
        that.setData({
          teachers: []
        })
        for (var i = 0; i < res.data.length; i++) {
          temp.push(res.data[i])
        }
        that.setData({
          teachers: temp
        })
      },
      error: function (e) {
        console.log(e)
      }
    })
  },

  getPlaces() {
    var that = this
    var temp = []
    wx.request({
      url: 'https://www.shutest.top/HXJD/WeChat/getPlace',
      header: getApp().globalData.header,
      dataType: 'json',
      success: function (res) {
        that.setData({
          places: []
        })
        for (var i = 0; i < res.data.length; i++) {
          temp.push(res.data[i])
        }
        that.setData({
          places: temp
        })

      }
    })
  },

  getTimes(){
    var that = this
   var temp1 = []
    wx.request({
      url: 'https://www.shutest.top/HXJD/WeChat/getBookTime',
      header:getApp().globalData.header,
      dataType:'json',
      success:function(res){
        that.setData({
          temp_booktime:res.data
        })
        for(var i = 0; i < res.data.length; i++){
          var temp = {"time":"00-00","status":"不可预约","flag":"0","chosen":"","color":"bg-blue"}
          temp.time = res.data[i].start_time+" "+"-"+" "+res.data[i].end_time
          temp.status  = "可预约"
          temp.flag = "1"
          temp.chosen = ""
          temp.color = "bg-blue"
          temp1.push(temp)
         }
        
         that.setData({
           timeArr:temp1
         })
      

      }
    })
  },

  showBook(){
    var temp1_result = []
    var that = this
    var temp = this.data.result
 
    for(var i = 0; i<temp.length; i++){
      var temp1 = {"time":"00-00","status":"可预约","flag":"1","chosen":"0","color":"bg-blue"}
      temp1.time = temp[i].start_time + "-" + temp[i].end_time; 
      temp1.chosen = ""
      switch(this.data.currentIndex){
        case 0:{
          if(temp[i].todayState == "1")
          {
            temp1.status = "可预约"
            temp1.flag = "1"
            temp1.color = "bg-blue"

          }
          else{
            temp1.status = "不可预约"
            temp1.flag = "0"
            temp1.color = "bg-red"
          }
        };break;
        case 1:{
            if(temp[i].tomorrowState == "1"){
              temp1.status = "可预约";
              temp1.flag = "1";
              temp1.color = "bg-blue"
            }else{
              temp1.status = "不可预约"
              temp1.flag = "0"
              temp1.color = "bg-red"
            }
        };break;
        case 2:{
          if(temp[i].twoDayState == "1"){
            temp1.status = "可预约";
            temp1.flag = "1";
            temp1.color = "bg-blue"
          }else{
            temp1.status = "不可预约"
            temp1.flag = "0"
            temp1.color = "bg-red"
          }
        };break;
        case 3:{
          if(temp[i].threeDayState == "1"){
            temp1.status = "可预约";
            temp1.flag = "1";
            temp1.color = "bg-blue"
          }else{
            temp1.status = "不可预约"
            temp1.flag = "0"
            temp1.color = "bg-red"
          }
        };break;
        case 4:{
          if(temp[i].fourDayState == "1"){
            temp1.status = "可预约";
            temp1.flag = "1";
            temp1.color = "bg-blue"
          }else{
            temp1.status = "不可预约"
            temp1.flag = "0"
            temp1.color = "bg-red"
          }
        };break;
        case 5:{
          if(temp[i].fiveDayState == "1"){
            temp1.status = "可预约";
            temp1.flag = "1";
            temp1.color = "bg-blue"
          }else{
            temp1.status = "不可预约"
            temp1.flag = "0"
            temp1.color = "bg-red"
          }
        };break;
        case 6:{
          if(temp[i].sixDayState == "1"){
            temp1.status = "可预约";
            temp1.flag = "1";
            temp1.color = "bg-blue"
          }else{
            temp1.status = "不可预约"
            temp1.flag = "0"
            temp1.color = "bg-red"
          }
        };break;
        default:break;
      }
      temp1_result.push(temp1)
      
    }
    that.setData({
      timeArr:temp1_result
    })
  },


  submit(e) {
    if(this.data.teacher_index == 0){
      wx.showToast({
        title: '选择教师',
        icon:'none',
        duration:2000
      })
    }else {
      var that = this 
      var result_temp = []
       wx.showModal({
         title:'提示',
         content:'确认提交',
         success(res){
           if(res.confirm){
          var temp = wx.getStorageSync('bookTable')
          if(temp.length == 0){
            wx.showToast({
              title: '预约为空',
              icon:'none',
              duration:2000
            })
          }else{
          
           for(var i = 0; i<temp.length; i++){
            var  temp1 = {"start_time":"00:00","end_time":"00:00","date":"0000-00-00","tele_num":"12345678901","place_name":"场地"}
            temp1.start_time = temp[i].start_time;
            temp1.end_time = temp[i].end_time;
            temp1.date = that.data.date1;
            temp1.tele_num = that.data.teachers[that.data.teacher_index].tele_num;
            temp1.place_name = that.data.places[that.data.place_index].name
            result_temp.push(temp1) 
           } 
           wx.request({
             url: 'https://www.shutest.top/HXJD/WeChat/saveBookRecorder',
             data:result_temp,
             dataType:'json',
             method:'POST',
             header:{"content-type":"application/json",
                     "Cookie":getApp().globalData.header.Cookie},
             success:function(res){
              
            if(res.data.code == "login"){
              wx.showToast({
                title: '断开连接，请刷新',
                icon:'none',
                duration:2000
              })
            }else if(res.data.code == "exist"){
              wx.removeStorageSync('bookTable');
              wx.showToast({
                title: '预约冲突，请切换日期重试',
                icon:'none',
                duration:2000
              })
            }else if(res.data.code == "success"){
              wx.removeStorageSync('bookTable');
              wx.showToast({
                title: '预约成功',
                icon:'success',
                duration:2000
              })
          
              that.getPalceBook()
            
            }else{
              wx.showToast({
                title: '异常，重试',
                icon:'none',
                duration:2000
              })
            }
             },
             error:function(e){
              wx.removeStorageSync('bookTable');
             
             }
           })
          }
  
           }
         }
       })
    }

  }
})