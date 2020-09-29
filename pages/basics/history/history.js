const app = getApp();
Page({
  data:{
    history:wx.getStorageSync('repair_data')
  },
  onLoad:function(){
this.setData({
  history:wx.getStorageSync('repair_data')
})
  }
});