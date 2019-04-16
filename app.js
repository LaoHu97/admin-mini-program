//app.js
const api = require('./api/api')

App({
  onLaunch: function () {
    // this.getUserSession()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.weixinUserInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    wx.checkSession({
      success: res => {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('session未过期')
        let sessionId = wx.getStorageSync('sessionId')
        if (!sessionId) {
          this.getUserSession(this.getUserList)
        } else {
          this.getUserList()
        }
      },
      fail: res => {
        // session_key 已经失效，需要重新执行登录流程
        console.log('session已过期')
        this.getUserSession(this.getUserList) //重新登录
      }
    })
  },
  getUserList () {
    let _this = this
    let promise = new Promise(function (resolve, reject) {
      api.getLoginUserInfoList().then(res => {
        if (res.status === 200) {
          _this.globalData.userList = res.loginUserInfoList
          resolve(res)
          if (_this.userListCallback) {
            _this.userListCallback(res)
          }
        }
      })
    })
    return promise
  },
  getUserSession (callback) {
    wx.login({
      success: res => {
         //发起网络请求
         let para = {
          code: res.code,
          appid: 'wx32a0348172f66270',
          sessionId: ''
        }
        api.getMiniSession(para).then(res => {
          if (res.status === 200) {
            wx.setStorageSync('sessionId', res.sessionId)
            callback()
          }
        })
      }
    })
  },
  globalData: {
    weixinUserInfo: null,
    userInfo: null,
    storeData: null,
    userList: null
  }
})