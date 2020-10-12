Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    elements: [{
        title: '我的行程',
        name: 'schedule',
        color: 'cyan',
        icon: 'newsfill'
      },
      {
        title: '场地预约',
        name: 'order',
        color: 'blue',
        icon: 'colorlens'
      },
      {
        title: '动态口令',
        name: 'password',
        color: 'purple',
        icon: 'font'
      },

      {
        title: '我的预约',
        name: 'myorder',
        color: 'red',
        icon: 'myfill'
      },
      {
        title: '工具 ',
        name: 'tool',
        color: 'mauve',
        icon: 'icon'
      }
    ],
    islg:false
  },
  methods: {
    onShareAppMessage: function(res){
      return {
        title: "华新基地",
        desc: "首页",
        imageUrl:'../../../images/BasicsBg.png',
        path: '/pages/basics/home/home',
     
        success: function (res) {
          // 转发成功
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {
          // 转发失败
          console.log("转发失败:" + JSON.stringify(res));
    
      }
    }
    },
    islogin: function () {
    var flag = false;
    if (wx.getStorageSync("isLogin")) {
    flag = true;
    }
    console.log
    // 更新属性和数据的方法与更新页面数据的方法类似
    this.setData({
    islg:flag
    })
    }
    },
    pageLifetimes:{
    show:function(){
    this.islogin() 
    this.onShareAppMessage()
    }
    }
})