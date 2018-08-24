//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    placeholderInput: "input-placeholder",
    loginButtonDisabled: false,
    loginButtonLoading: false,
    accountInputFocus: true,
    passwordInputFocus: false
  },
  onLoad () {
    // Do some initialize when page load.
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
    // this.setData({
    //   loginButtonLoading: true,
    //   loginButtonDisabled: true
    // })
    wx.switchTab({
      url: '../index/index'
    })
    console.log(e)
  },
  bindConfirmAccount () {
    this.setData({
      accountInputFocus: false,
      passwordInputFocus: true
    })
  }
})