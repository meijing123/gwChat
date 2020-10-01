const app = getApp();
Page({
  data:{
    password:"无",
    date:'2020-10-01',
    start_time:'00:00',
    end_time:'00:00',
    time:'0',
    reason:'无',
    bz:'无'
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
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  start_timeChange(e){
     this.setData({
       start_time:e.detail.value
     })
  },
  end_timeChange(e){
    this.setData({
      end_time:e.detail.value
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
 } else if(!this.compareTime(this.data.start_time,this.data.end_time)){
   wx.showToast({
     title: '时间间隔至少1小时',
     icon:'none',
     duration:2000
   })
 }else{
   wx.request({
     url: 'http://localhost:8080/WeChat/saveCreatePassword',
     data:{
       password:this.data.password,
       usedate:this.data.date,
       start_time:this.data.start_time,
       end_time:this.data.end_time,
       time:this.data.time,
       reason:this.data.reason,
       bz:this.data.bz
      },
      method:'POST',
      header:getApp().globalData.header,
      dataType:'json',
      success:function(res){
        if(res.data.code == "login"){
          wx.showToast({
            title: '登录后重试',
            icon:'none',
            duration:2000,
            complete:function(){
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }
          })
        }else if(res.data.code == "ok"){
          wx.showToast({
            title: '成功',
            icon:'success',
            duration:2000
          })
        }
      }
   })
 }
},

 compareTime:function(start_time,end_time){
  start_time = start_time.split(":")[0];
  end_time = end_time.split(":")[0];
  if(parseInt(end_time) - parseInt(start_time)>=1){
    return true;
  }else {
    return false;
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
     date:today
    })
  },
});