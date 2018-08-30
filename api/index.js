const app = getApp()

const wxHttp = params => {
  wx.showLoading({
    title: '加载中'
  })
  let promise = new Promise(function (resolve, reject) {
    console.log(params)
    wx.request({
      url: params.url,
      data: params.data,
      method: params.method,
      success (res) {
        wx.hideLoading()
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