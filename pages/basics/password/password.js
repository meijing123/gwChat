const app = getApp();
Page({
  data:{
    password:"无",
    startDate:"2020-10-01",
    endDate: "2020-10-01",
    startTime:"00:00",
    endTime:"00:00",
    time:"0",
    reason:"无",
    bz:"无",
    bp: ["bp1", "bp2", "bp3"],
    bpIndex: null
  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh();
  },
  onLoad:function(){
     this.changePassword();
     this.TodayDate();
  },
  changePassword(e){
    var password = Math.random().toString().substr(2,6);
    this.setData({
      password:password
    })
  },
  startDateChange(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  endDateChange(e){
     this.setData({
       endDate: e.detail.value
     })
  },
  bpChange(e){
        this.setData({
          bpIndex: e.detail.value
        })
  },
  startTimeChange(e){
     this.setData({
       startTime:e.detail.value
     })
  },
  endTimeChange(e){
    this.setData({
      endTime:e.detail.value
    })
  },
  useTimes(e){
    this.setData({
          time:e.detail.value
    })
  },
  reason(e){
     this.setData({
       reason:e.detail.value
     })
  },
  bz(e){
    this.setData({
      bz:e.detail.value
    })
  },

submit(){
 if(this.data.time == "0"){
   wx.showToast({
     title: '请填写次数',
     icon:'none',
     duration:2000
   })
 } else if(!this.compareTime(this.data.startDate,this.data.startTime, this.data.endDate, this.data.endTime)){
   wx.showToast({
     title: '时间间隔至少1小时/开始日期应晚于结束日期',
     icon:'none',
     duration:2000
   })
 }else if(this.data.bpIndex === null){
      wx.showToast({
           title: '请选择班牌',
           icon: 'none',
           duration: 2000
      })
 }
 else{
   wx.request({
     url: 'https://www.shutest.top:8001/api/saveCreatePassword',
     data:{
       password:this.data.password,
       startDate:this.data.startDate,
       endDate: this.data.endDate,
       startTime:this.data.startTime,
       endTime:this.data.endTime,
       time:this.data.time,
       reason:this.data.reason,
       bz:this.data.bz,
       bp: this.data.bp[this.data.bpIndex]
       
      },
      method:'POST',
      header:getApp().globalData.header,
      dataType:'json',
      success:function(res){
         if(res.data.code == "200"){
           if(res.data.message === ""){
            wx.showToast({
              title: '成功',
              icon:'success',
              duration:2000
            })
          }else{
            wx.showToast({
              title: '异常',
              icon:'none',
              duration:2000
            })
          }

        }else{
          wx.showToast({
            title: '网络异常',
            icon:'none',
            duration:2000
          })
        }
      }
   })
 }
},

 compareTime:function(startD,startT,endD, endT){
  let startDateTemp = startD.split("-");
  let endDateTemp = endD.split("-");
  let startDate = parseInt(startDateTemp[0]+startDateTemp[1]+startDateTemp[2]);
  let endDate = parseInt(endDateTemp[0]+endDateTemp[1]+endDateTemp[2]);
  if( startDate === endDate ){
    let startTime = startT.split(":")[0];
    let endTime = endT.split(":")[0];
    if(parseInt(endTime) - parseInt(startTime)>=1){
      return true;
    }else {
      return false;
    }
  }else {
    if(startDate > endDate){
      return false;
    }else{
      return true;
    }
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
      startDate:today,
      endDate:today
    })
  },
});