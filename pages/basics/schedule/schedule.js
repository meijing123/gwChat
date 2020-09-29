const app = getApp();
Page({
  data: {
      date:'2020-09-01',
      textareaAValue: ''
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
})