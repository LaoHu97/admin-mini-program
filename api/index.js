
const wxHttp = params => {
  if (!params.data) {
    params.data = {}
  }
  let sessionId = wx.getStorageSync('sessionId')

  let header = {
    sessionId : sessionId
  }
  wx.showLoading({
    title: '请稍后',
    mask: true
  })
  console.log('发送数据：' ,params)
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: params.url,
      data: params.data,
      header: header,
      method: params.method,
      success: res => {
        console.info('接受数据：' ,res)
        wx.hideLoading()
        if (res.data.status === 200) {
          resolve(res) 
        } else if (res.data.status === 400){
          reject(res)
          wx.showModal({
            title: '提示',
            content: '登录过期，请重新登录',
            showCancel: false,
            success: res => {
              let app = getApp()
              app.getUserSession(app.getUserList)
              wx.reLaunch({
                url: '../login/login'
              })
            }
          })
        } else {
          reject(res)
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        reject(res)
        wx.showToast({
          title: '请检查网络连接',
          icon: 'none'
        })
      }
    })
  })
  return promise
}
module.exports = {
  wxHttp: wxHttp
}