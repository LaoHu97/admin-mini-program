//index.js
//获取应用实例
const app = getApp()
const md5 = require('../../utils/md5')
const api = require('../../api/api')

Page({
  data: {
    placeholderInput: "input-placeholder",
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
    let para = {
      account: e.detail.value.account,
      password: md5.hexMD5(e.detail.value.password + e.detail.value.account),
      userInfo: JSON.stringify(app.globalData.weixinUserInfo)
    }
    api.bindRoleAndUser(para).then(res=>{
      if (res.status === 200) {
        app.getUserList().then(res => {
          console.log(res)
          wx.reLaunch({
            url: '../login/login',
            success: res => {
              wx.showToast({
                title: '绑定成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        })
      }
    }).catch(err => {
      this.setData({
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