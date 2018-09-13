const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../api/api')

Page({
  data: {
    avatarUrl: ''
  },
  onLoad: function () {
    console.log(app.globalData.weixinUserInfo);
    this.setData({
      avatarUrl: app.globalData.weixinUserInfo.avatarUrl
    })
  },
  logOut () {
    wx.redirectTo({
      url: '../login/login',
      success: res => {
        app.getUserList()
        app.globalData.storeData = null
      }
    })
    app.resetSubmit()
  },
  logOutBind () {
    wx.showModal({
      title: '提示',
      content: '确定解除账号绑定？',
      success: res => {
        if (res.confirm) {
          let para = {
            account: app.globalData.userInfo.loginUserInfo.account,
            role: app.globalData.userInfo.loginUserInfo.role
          }
          api.unbindRoleAndUser(para).then(res => {
            if (res.status === 200) {
              app.getUserList().then(res => {
                wx.navigateTo({
                  url: '../login/login',
                  success: res => {
                    wx.showToast({
                      title: '解绑成功',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                })
              })
            }
          })
        }
      }
    })
  }
})
