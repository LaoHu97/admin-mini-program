// wx.cloud.init()

const app = getApp()
// const db = wx.cloud.database()
// const logs = db.collection('logs')

const wxHttp = params => {
  // wx.showLoading({
  //   title: '加载中',
  //   mask: true
  // })
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: params.url,
      data: params.data,
      method: params.method,
      success (res) {
        // logs.add({
        //   data:{
        //     date: new Date(),
        //     response: params,
        //     request:res
        //   }
        // }).then(res => {
        //   console.log(res)
        // })
        // wx.hideLoading()
        if (res.statusCode !== 200) {
          wx.showToast({
            title: '请检查网络连接',
            icon: 'none'
          })
        } else {
          if (res.data.status !== 200) {
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
          resolve(res)
        }
      }
    })
  })
  return promise
}
module.exports = {
  wxHttp: wxHttp
}