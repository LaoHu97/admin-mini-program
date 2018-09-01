//index.js
//获取应用实例
const app = getApp()
const md5 = require('../../utils/md5')
const api = require('../../api/api')

Page({
  data: {
    placeholderInput: "input-placeholder",
    loginButtonDisabled: false,
    loginButtonLoading: false,
    accountInputFocus: true,
    passwordInputFocus: false
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '帐号登录'
    })
  },
  bindFocusInput () {
    this.setData({
      placeholderInput: 'placeholder_input'
    })
  },
  loginFormSubmit (e) {
    this.setData({
      loginButtonLoading: true,
      loginButtonDisabled: true
    })
    let para = {
      account: e.detail.value.account,
      password: md5.hexMD5(e.detail.value.password + e.detail.value.account)
    }
    api.loginApp(para).then(res=>{
      if (res.status === 200) {
        app.globalData.userInfo = res.data
        wx.setStorage({
          key: "accountInfo",
          data: para
        })
        wx.switchTab({
          url: '../index/index'
        })
      }
    }).then(res=>{
      this.setData({
        loginButtonLoading: false,
        loginButtonDisabled: false
      })
    })
  },
  bindConfirmAccount () {
    this.setData({
      accountInputFocus: false,
      passwordInputFocus: true
    })
  }
})