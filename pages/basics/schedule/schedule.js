
Page({
  data: {
      date: "2020-09-01",
      textareaAValue: ''
  },

    onPullDownRefresh:function(){
      var username = wx.getStorageSync('username');
      var password = wx.getStorageSync('password');
      getApp().login(username,password)
      wx.stopPullDownRefresh()
  
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.TodayDate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
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
     date:today
    })
  },
  submit(e){
    wx.request({
      url: 'https://www.shutest.top/HXJD/WeChat/saveSchedule',
      data:{date:this.data.date,text:this.data.textareaAValue},
      method:'POST',
      header:getApp().globalData.header,
      dataType:'json',
      success:function(res){
  
        console.log(res)
        if(res.data.code == "login"){
          wx.showToast({
            title: '超时重新登录',
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
        }else{
          wx.showToast({
            title: '出错',
            icon:'none',
            duration:2000
          })
        }

      },error:function(e){
        console.log(e)
      }

    })
  }
})
