const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    name: '',
    account: ''
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '设置'
    })
    this.setData({
      name: app.globalData.userInfo.name,
      account: app.globalData.userInfo.account
    })
  },
  logOut () {
    wx.clearStorage({
      success:function () {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
  }
})
