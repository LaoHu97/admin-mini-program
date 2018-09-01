//app.js
const api = require('./api/api')
App({
  onShow: function () {
    this.getLogin()
  },
  getLogin () {
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
            wx.switchTab({
              url: '/pages/index/index'
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