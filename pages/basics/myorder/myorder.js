// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place_index: null,
    places: [],
    date1: '',
    bookRecorders: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.TodayDate()
    this.getPlaces().then(res => {
      let temp = []
      this.setData({
        places: []
      })
      for (var i = 0; i < res.data.data.length; i++) {
        temp.push(res.data.data[i])
      }
      this.setData({
        places: temp
      })
      this.getRecoder();
    })


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
  TodayDate: function () {

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var today = Y + "-" + M + "-" + D;
    this.setData({
      date1: today
    })
  },

  placeChange(e) {
    this.setData({
      place_index: e.detail.value
    });
    this.getRecoderBy()
  },
  getRecoderBy() {
    this.getRecoder();
  },
  DateChange(e) {
    this.setData({
      date1: e.detail.value
    });
    this.getRecoderBy()
  },

  getPlaces() {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://www.shutest.top:8001/api/getPlaceName',
        header: getApp().globalData.header,
        dataType: 'json',
        method: 'POST',
        success: function (res) {
          resolve(res);
        },
      })
    })
  },

  getRecoder() {
    let that = this
     let  index = this.data.place_index;
     let placeName = "empty";
     if(index != null){
       placeName = this.data.places[index]
     } 
    wx.request({
      url: 'https://www.shutest.top:8001/api/getAllOrder',
      data: {
        date: this.data.date1,
        placeName: placeName
      },
      method: 'POST',
      header: getApp().globalData.header,
      dataType: 'json',
      success: function (res) {
        if (res.data.code == "200") {
          that.setData({
            bookRecorders: res.data.data
          })

        } else {
          wx.showToast({
            title: '异常',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })

  },
  del: function (event) {
    let that = this
    let del_id = event.currentTarget.dataset.id;
    var operatorId = event.currentTarget.dataset.operatorid;
    var index = event.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success(res) {
        if (res.confirm) {
          if (operatorId === wx.getStorageSync('id') || wx.getStorageSync('role') === "0") {
            wx.request({
              url: 'https://www.shutest.top:8001/api/deleteOrder',
              data: {
                id: del_id,
              },
              dataType: 'json',
              header: getApp().globalData.header,
              method: 'POST',
              success: function (res) {
                if (res.data.code === 200) {
                  if (res.data.message === "") {
                    that.data.bookRecorders.splice(index, 1)
                    that.setData({
                      bookRecorders: that.data.bookRecorders
                    })
                    wx.showToast({
                      title: '取消成功',
                      icon: 'success',
                      duration: 2000
                    })
                  } else {
                    wx.showToast({
                      title: '出错，请重试',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                } else {
                  wx.showToast({
                    title: '网络错误',
                    icon: 'none',
                    duration: 2000
                  })
                }

              }
            })
          } else {
            wx.showToast({
              title: '这不是您的预约，无法取消',
              icon: 'none',
              duration: 2000
            })
          }
        }
      }
    })
  }
})