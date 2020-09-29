Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
        title: '宿舍公告',
        name: 'notice',
        color: 'cyan',
        icon: 'newsfill'
      },
      {
        title: '校园报修',
        name: 'repair',
        color: 'blue',
        icon: 'colorlens'
      },
      {
        title: '报修历史',
        name: 'history',
        color: 'purple',
        icon: 'font'
      },

      {
        title: '个人信息',
        name: 'info',
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