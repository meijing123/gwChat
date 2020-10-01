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
    date1:""
  },
  onLoad: function (options) {
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
   const date = new Date();
   const cur_year = date.getFullYear();
   const cur_month = date.getMonth() + 1;
   const cur_date=date.getDate();
   const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
   //利用构造函数创建对象
   function calendar(date,week){
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
 
  select:function(event){
    //为上半部分的点击事件
    this.setData({
     currentIndex: event.currentTarget.dataset.index
    })
    console.log(event.currentTarget.dataset.date)
   },
   selectTime:function(event){
    //为下半部分的点击事件
    this.setData({
     currentTime: event.currentTarget.dataset.tindex
    })
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
    })

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
      url: 'http://localhost:8080/WeChat/getTeacher',
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
      url: 'http://localhost:8080/WeChat/getPlace',
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
      url: 'http://localhost:8080/WeChat/getBookTime',
      header:getApp().globalData.header,
      dataType:'json',
      success:function(res){
        that.setData({
          timeArr:[]
        })
        for(var i = 0; i < res.data.length; i++){
          var temp = {"time":"00-00","status":"不可预约","flag":"0"}
          temp.time = res.data[i].start_time+"-"+res.data[i].end_time
          temp.status  = "可预约"
          temp.flag = "1"
          temp1.push(temp)
         }
        
         that.setData({
           timeArr:temp1
         })
         console.log(that.data.timeArr)

      }
    })
  },


  submit(e) {

  }
})