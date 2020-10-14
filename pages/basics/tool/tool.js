// pages/basics/tool/tool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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
  exit(e){
      wx.showModal({
        title:'提示',
        content:'确认退出',
        success (res){
          if(res.confirm){
            wx.removeStorageSync('username');
            wx.removeStorageSync('password');
            wx.removeStorageSync('isLogin');
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
        }
      })
  },
  scan(e){
    var that = this
wx.getSetting({
  success(res){
    if(!res.authSetting['scope.camera']){
      wx.authorize({
        scope: 'scope.camera',
        success(){
          console.log("s")
          that.scan();
        },fail(){
              wx.showToast({
                title: '未授权',
                duration:3000
              })
        }
      })
    }else{
   
 
      wx.scanCode({
        scanType:['qrCode'],
        success:function (res){
          var data = res.result;
          wx.showModal({
            title:'提示',
            content:'确认登录',
            success(res){
              if(res.confirm){
                var url = data;
                getApp().globalData.head.Cookie = url.split("?")[1];
                wx.request({
                  url: url.split("?")[0],
                  method:'POST',
                  header:getApp().globalData.head,
                  data:{username:wx.getStorageSync('username'),password:wx.getStorageSync('password'),
                  sessionid:getApp().globalData.head.Cookie.split("=")[1]},
                  dataType:'json',
                 success:function(res){
                    if(res.data[0]  === "ok"){
                      getApp().globalData.head.Cookie = ''
                    }
                  }
                })
              }else{
                wx.redirectTo({
                  url: '/pages/basics/tool/tool',
                })
              }
            }
          })

        }
      })
    }
  }
})




   

  }
})