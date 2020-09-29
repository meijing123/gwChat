const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: 0,
    lei_index:0,
    lei:['水电 ',['网络'],'桌椅床'],
    picker: ['南1', '南2', '南3','南4','南5','南6','南7','南8','南9','南10','南11','南12'],
    time: '12:01',
    date: '2018-12-25',
    imgList: [],
    textareaAValue: '',
    number:'19721547',
    name:'梅静',
    room:'114',
    result:[],
    building:null
  },
 

  PickerChange(e) {
    
    console.log(e);
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
    
  },

  LeiChange(e) {
    
    console.log(e);
    console.log(e.detail.value)
    this.setData({
      lei_index: e.detail.value
    })
    
  },

  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
    
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
 
       }
      
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除照片',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },

  submit(e){
    wx.showToast({
      title: '提交成功',
      icon:'success',
      duration:2000
    })
    let res = wx.getStorageSync("repair_data");
   
    console.log("res:"+res)
   if(res==""){
     let result = []
     result.push({
       "building": this.data.picker[this.data.index],
       "time": this.data.time,
       "date": this.data.date,
       "image": this.data.image,
       "event": this.data.textareaAValue,
       "number": this.data.number,
       "name": this.data.name,
       "room": this.data.room,
       "lei": this.data.lei[this.data.lei_index]
     })
     wx.setStorageSync('repair_data', result)
   }else{
     res.push({
       "building": this.data.picker[this.data.index],
       "time": this.data.time,
       "date": this.data.date,
       "image": this.data.image,
       "event": this.data.textareaAValue,
       "number": this.data.number,
       "name": this.data.name,
       "room": this.data.room,
       "lei": this.data.lei[this.data.lei_index]
     })
     wx.setStorageSync('repair_data', res)
   }
 
  
    
  }
})