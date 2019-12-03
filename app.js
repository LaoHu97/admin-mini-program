//app.js
const api = require('./api/api')
const webSocket = require('./utils/webSocket.js')
const fs = wx.getFileSystemManager()

App({
  onLaunch: function () {
    // this.getUserSession()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.weixinUserInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    wx.checkSession({
      success: res => {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('session未过期')
        let sessionId = wx.getStorageSync('sessionId')
        if (!sessionId) {
          this.getUserSession(this.getUserList)
        } else {
          this.getUserList()
        }
      },
      fail: res => {
        // session_key 已经失效，需要重新执行登录流程
        console.log('session已过期')
        this.getUserSession(this.getUserList) //重新登录
      }
    })
    wx.onMemoryWarning(function () {
      wx.showToast({
        title: '内存警告',
        icon: 'none',
        duration: 2000
      })
    })
  },
  getAudio() {
    wx.showLoading({
      title: '下载数据'
    })
    let _this = this
    console.log(api.audioFileUrl)
    wx.downloadFile({
      url: api.audioFileUrl,
      success: res => {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log('下载MP3文件：', res)
        let tempFilePathType = res.tempFilePath.slice(-3)
        console.log(tempFilePathType)
        if (res.statusCode === 200 && tempFilePathType !== 'txt') {
        fs.saveFile({
          tempFilePath: res.tempFilePath,
          success: res => {
            console.log('保存MP3文件：', res)
            wx.hideLoading()
            _this.globalData.audioFile = res.savedFilePath
            if (_this.audioCallback) {
              _this.audioCallback(res)
            }
          },
          fail: err => {
            console.error('保存MP3文件错误', err)
            wx.hideLoading()
            wx.showToast({
              title: '保存MP3文件错误',
              icon: 'none',
              duration: 2000
            })
          }
        })}else{
          console.error('下载MP3文件错误，语音播报可能无效')
          wx.hideLoading()
          wx.showToast({
            title: '下载MP3文件错误，语音播报可能无效',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: err => {
        console.error('下载MP3文件错误：', err)
        wx.hideLoading()
        wx.showToast({
          title: '下载MP3文件错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getUserList () {
    let _this = this
    let promise = new Promise(function (resolve, reject) {
      api.getLoginUserInfoList().then(res => {
        if (res.status === 200) {
          _this.globalData.userList = res.loginUserInfoList
          resolve(res)
          if (_this.userListCallback) {
            _this.userListCallback(res)
          }
          fs.getSavedFileList({
            success: res => {
              console.log('MP3文件列表：', res.fileList)
              // wx.removeSavedFile({
              //   filePath: res.fileList[0].filePath,
              //   complete(res) {
              //     console.log(res)
              //   }
              // })
              if (!res.fileList.length) {
                _this.getAudio()
              }
            }
          })
        }
      })
    })
    return promise
  },
  getUserSession (callback) {
    wx.login({
      success: res => {
        const accountInfo = wx.getAccountInfoSync()
         //发起网络请求
         let para = {
          code: res.code,
          appid: accountInfo.miniProgram.appId,
          sessionId: ''
        }
        api.getMiniSession(para).then(res => {
          if (res.status === 200) {
            wx.setStorageSync('sessionId', res.sessionId)
            callback()
          }
        })
      }
    })
  },
  globalData: {
    weixinUserInfo: null,
    userInfo: null,
    storeData: null,
    userList: null,
    audioFile: null
  }
})