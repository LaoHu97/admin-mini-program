const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    name: '',
    account: ''
  },
  onLoad: function () {
    
  },
  onShow:function () {
    this.setData({
      name: app.globalData.userInfo.loginUserInfo.role_name,
      account: app.globalData.userInfo.loginUserInfo.account
    })
  }
})