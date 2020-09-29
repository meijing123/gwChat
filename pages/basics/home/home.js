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
      }
    ],
    islg:false
  },
  methods: {
    islogin: function () {
    console.log("登陆判断")
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
    }
    }
})