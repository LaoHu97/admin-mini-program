//index.js
//获取应用实例
const app = getApp()
const api = require('../../api/api')
const webSocket = require('../../utils/webSocket.js')

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userList: [],
    socketMessage: ''
  },
  onLoad: function () {
    if (app.globalData.userList) {
      console.log('正常');
      this.setData({
        userList: app.globalData.userList
      })
    } else {
      console.log('正常流程');
      app.userListCallback = res => {
        this.setData({
          userList: res.loginUserInfoList
        })
      }
    }
    if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.weixinUserInfo = res.userInfo
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.weixinUserInfo = res.userInfo
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (app.globalData.weixinUserInfo) {
      wx.navigateTo({
        url: '../bind/bind'
      })
    } else if (e.detail.errMsg === "getUserInfo:ok") {
      app.globalData.weixinUserInfo = e.detail.userInfo
      wx.navigateTo({
        url: '../bind/bind'
      })
    }
  },
  clickUser(e) {
    let para = {
      role: e.currentTarget.dataset.useritem.role,
      role_id: e.currentTarget.dataset.useritem.role_id.toString()
    }
    api.getLoginRole(para).then(res => {
      if (res.status === 200) {
        wx.setStorageSync('wsSessionId', res.data.wsSessionId)
        app.globalData.userInfo = res.data
        wx.switchTab({
          url: '../index/index'
        })
        if (res.data.loginUserInfo.reverse1 === 'Y') {
          this.webSocketStart()
        }
      }
    })
  },
  webSocketStart() {
    // 创建连接
    webSocket.connectSocket()
  }
})