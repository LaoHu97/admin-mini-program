//app.js
const api = require('./api/api')
App({
  onLaunch: function () {
    this.getLogin()
  },
  getLogin (cb) {
    try {
      let accountInfo = wx.getStorageSync('accountInfo')
      if (accountInfo) {
        let para = {
          account: accountInfo.account,
          password: accountInfo.password
        }
        api.loginApp(para).then(res=>{
          if (res.status === 200) {
            this.globalData.userInfo = res.data
            wx.setStorage({
              key: "accountInfo",
              data: para
            })
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res.data)
            }
          }
        })
      }else{
        wx.redirectTo({
          url: '/pages/login/login',
          success () {
            wx.showToast({
              title: '尚未登陆，请重新登录',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    } catch (error) {
      console.log('错误：' + error)
    }
  },
  globalData: {
    userInfo: null,
    storeData: null
  }
})