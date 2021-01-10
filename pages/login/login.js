// pages/login/login.js
import jwt from "../../weapp-jwt";
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    Show:"password",
    password: null,
    account:null
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
  accountInput: function (e) {
    var username = e.detail.value; //从页面获取到用户输入的用户名/邮箱/手机号
    if (username != '') {
      this.setData({
        account: username
      }); //把获取到的密码赋值给全局变量Date中的password
    }
  },
  //处理pwdBlurt的触发事件
  pwdBlur: function (e) {
    var pwd = e.detail.value; //从页面获取到用户输入的密码
    if (pwd != '') {
      this.setData({
        password: pwd
      }); //把获取到的密码赋值给全局变量Date中的password
    }
  },

  login:function(e){
    var that = this;
    wx.request({
      url: 'https://www.shutest.top:8001/api/login',
      data:{telephone:that.data.account,password:that.data.password},
      dataType:'json',
      method:'POST',
      success:function(res){
        if(res.data.code == "200"){
        wx.setStorageSync('Authorization', res.data.data)
          getApp().globalData.header.Authorization = res.data.data;
          let temp = jwt(res.data.data)
          wx.setStorageSync('id', temp.id);
          wx.setStorageSync('name', temp.name);
          wx.setStorageSync('role', temp.role);
          wx.setStorageSync('isLogin', true);
          wx.showToast({
            title: '登录成功',
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/basics/home/home',
            })
          }, 1000)
          wx.setStorageSync('isLogin', true)
         
        }else{
          wx.showModal({
            title: '提示',
            content: '未识别匹配的账号和密码',
            showCancel: false
          })
        }
      },error:function(e){
        console.log(e)
      }
      

    })

  }
})