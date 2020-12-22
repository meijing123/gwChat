function POST(url, params) {
  //加载loading
  wx.showLoading({
      title: '加载中...',
      mask: true
  })
  let promise = new Promise(function (resolve, reject) {
      wx.request({
          url: url,
          data: params,
          header: {
              "Content-Type": "application/x-www-form-urlencoded",
          },
          method: 'POST',
          success: (res) => {
              resolve(res)
          },
          fail: (res) => {
              reject(res)
          },
          complete: () => {
              wx.hideLoading()
          }
      })
  });
  return promise;
}
function GET(url, params) {
  let promise = new Promise(function (resolve, reject) {
      wx.request({
          url: url,
          data: params,
          header: {
              "Content-Type": "application/x-www-form-urlencoded",
          },
          method: 'GET',
          success: (res) => {
              resolve(res)
          },
          fail: (res) => {
              reject(res)
          }
      })
  });
  return promise
}
module.exports = {
  POST: POST,
  GET: GET,
}