const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur:0,
    tabNav: ['公告', '通知'],
    feed:[{
      title:"公告1",
      content:"房间拒腐防变方便不方便烦不烦"
    },
    {
      title:"公告2",
      content:"房间拒腐防变方便不方便烦不烦"
    },
    {
      title:"公告3",
      content:"房间拒腐防变方便不方便烦不烦把VG嘎嘎嘎嘎嘎过过过过过过过过过过过过过过过过过过过多是深V更多发的发的方法的广告费"
    },
    {
      title:"公告4",
      content:"房间拒腐防变方便不方便烦不烦"
    }],
    notice:[{      
      title:"通知1",
    content:"房间拒腐防变方便不方便烦不烦"
  },{
    title:"通知1",
    content:"房间拒腐防变方便不方便烦不烦"
  },{
    title:"通知31",
    content:"房间拒腐防变方便不方便烦不烦"
  }]
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})