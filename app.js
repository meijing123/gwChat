//app.js
App({   
  login:function(account,pwd){
    if(account == null || account ==""){
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }else{ 
  var that = this;
  wx.request({
    url: 'https://www.shutest.top/HXJD/WeChat/login',
    data:{username:account,password:pwd},
    dataType:'json',
    method:'POST',
    header:getApp().globalData.header,
    success:function(res){

      if(res.data.code == "ok"){
      wx.setStorageSync('username', account)
      wx.setStorageSync('password', pwd)
        getApp().globalData.header.Cookie = "JSESSIONID="+ res.data.sessionId;
        wx.showToast({
          title: '登录成功',
        })
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
},

  onLaunch: function() {
    // if (wx.cloud) {
    //   wx.cloud.init({
    //     traceUser: true
    //   })
    // }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })
  },
  globalData: {
  header:{
    "content-type": "application/x-www-form-urlencoded",
      'Cookie': ''
  },
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ]
  }
})