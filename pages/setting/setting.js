const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../api/api')

Page({
  data: {
    avatarUrl: '',
    name: ''
  },
  onLoad: function () {
    console.log(app);
    this.setData({
      avatarUrl: app.globalData.weixinUserInfo.avatarUrl,
      name: app.globalData.weixinUserInfo.nickName
    })
  },
  logOut () {
    wx.reLaunch({
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
                wx.reLaunch({
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
