const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../api/api')
const webSocket = require('../../utils/webSocket.js')

Page({
  data: {
    avatarUrl: '',
    name: '',
    switchOpenStatus: false,
    successionHidden: true
  },
  onLoad: function () {
    this.setData({
      avatarUrl: app.globalData.weixinUserInfo.avatarUrl,
      name: app.globalData.weixinUserInfo.nickName
    })
  },
  onShow() {
    this.setData({
      switchOpenStatus: app.globalData.userInfo.loginUserInfo.reverse1 === 'Y' ? true : false
    })
    if (app.globalData.userInfo.loginUserInfo.role === 'employee') {
      this.setData({
        successionHidden: false
      })
    }
  },
  logOut () {
    wx.reLaunch({
      url: '../login/login',
      success: res => {
        app.getUserList()
        webSocket.closeSocket()
        app.globalData.storeData = null
      }
    })
    app.resetSubmit()
  },
  switchChange (e) {
    let that = this
    let options = {
      success(val) {
        that.getIsOpenSound(e.detail.value)
      }
    }
    if (e.detail.value) {
      // 创建连接
      webSocket.connectSocket(options)
    } else {
      // 销毁连接
      webSocket.closeSocket(options)
    }
  },
  getIsOpenSound(val) {
    let para = {
      account: app.globalData.userInfo.loginUserInfo.account,
      role: app.globalData.userInfo.loginUserInfo.role,
      isOpenSound: val === true ? 'Y' : 'N'
    }
    api.isOpenSound(para).then(res => {
      app.globalData.userInfo.loginUserInfo.reverse1 = para.isOpenSound
      wx.showToast({
        title: '操作成功',
        icon: 'success',
        duration: 2000
      })
    })
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
                    webSocket.closeSocket()
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
