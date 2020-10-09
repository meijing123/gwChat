// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place_index: 0,
    places: [],
    date1:'',
    bookRecorders:[],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.TodayDate()
   this.getPlaces()
   this.getRecoder()
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
  onPullDownRefresh:function(){
    var username = wx.getStorageSync('username');
    var password = wx.getStorageSync('password');
    getApp().login(username,password)
    wx.stopPullDownRefresh();
    this.onLoad()
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
  this.getRecoderBy()
  },
  getRecoderBy(){
    var that = this 
    var place_name = this.data.places[this.data.place_index].name;
    var date  = this.data.date1

    wx.request({
      url: 'https://www.shutest.top/HXJD/WeChat/getOrderBy',
      method:'POST',
      data:{place_name:place_name,date:date},
      header:getApp().globalData.header,
      dataType:'json',
      success:function(res){
        console.log(res.data)
        that.setData({
          bookRecorders:res.data
        })
      }

    })
  },
  DateChange(e) {
    this.setData({
      date1: e.detail.value
    });
    this.getRecoderBy()
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
getRecoder(){
  var that = this
  wx.request({
    url: 'https://www.shutest.top/HXJD/WeChat/getOrder',
    data:{date:this.data.date1},
    method:'POST',
    header:getApp().globalData.header,
    dataType:'json',
    success:function(res){
      if(res.data.code == "login"){
        wx.showToast({
          title: '断开连接，请下拉登录',
          icon:'none',
          duration:2000
        })
      }else {
        that.setData({
          bookRecorders:res.data.data
        })
      }
    }
  })
},
del:function(event){
  var that = this
  var del_id  = event.currentTarget.dataset.id;
  var operator = event.currentTarget.dataset.operator;
  var index =  event.currentTarget.dataset.index;

 wx.showModal({
   title:'提示',
   content:'确认删除',
   success(res){
     if(res.confirm){
       wx.request({
         url: 'https://www.shutest.top/HXJD/WeChat/delOrder',
         data:{id:del_id,operator:operator},
         dataType:'json',
         header:getApp().globalData.header,
         method:'POST',
         success:function(res){
           if(res.data.code == "login"){
             wx.showToast({
               title: '断开连接，请下拉刷新后重试',
               icon:'none',
               duration:2000
             })
           }else if(res.data.code == "noauth"){
             wx.showToast({
               title: '这不是您的预约，无法取消',
               icon:'none',
               duration:2000
             })
           } else if(res.data.code == "error"){
             wx.showToast({
               title: '出错，请重试',
               icon:'none',
               duration:2000
             })
           } else if(res.data.code == "ok"){
            that.data.bookRecorders.splice(index,1)
            that.setData({
              bookRecorders:that.data.bookRecorders
            })
             wx.showToast({
               title: '取消成功',
               icon:'success',
               duration:2000
             })
           }
         }



       })

     }
   }
 })
}
})