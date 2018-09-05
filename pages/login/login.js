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
    passwordInputFocus: false,
    account: '',
    password: ''
  },
  bindFocusInput () {
    this.setData({
      placeholderInput: 'placeholder_input'
    })
  },
  onShow: function () {
    console.log(app.globalData)
  },
  loginFormSubmit (e) {
    if (!e.detail.value.account) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!e.detail.value.password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      loginButtonLoading: true,
      loginButtonDisabled: true
    })
    let para = {
      account: e.detail.value.account,
      password: md5.hexMD5(e.detail.value.password + e.detail.value.account)
    }
    let accountInfo = wx.getStorageSync('accountInfo')
    api.loginApp(accountInfo || para).then(res=>{
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
        loginButtonDisabled: false,
        account: '',
        password: ''
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