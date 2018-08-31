const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../api/api')
const md5 = require('../../utils/md5')

Page({
  data: {
    orderId: '',
    btntext: '获取验证码',
    buttonType: 'primary',
    buttonDisabled: false
  },
  onLoad(item) {
    wx.setNavigationBarTitle({
      title: '退款'
    })
    this.setData({
      orderId: item.orderId
    })
  },
  clickCode() {
    let para = {
      mid: app.globalData.userInfo.mid,
      sid: app.globalData.userInfo.sid,
      orderId: this.data.orderId
    }
    api.sendVerCodeT(para).then(res => {
      if (res.status === 200) {
        let coden = 60
        let _this = this
        _this.setData({
          btntext: '重新获取60s',
          buttonType: 'default',
          buttonDisabled: true
        })
        let codeV = setInterval(function () {
          _this.setData({
            btntext: '重新获取' + (--coden) + 's'
          })
          if (coden == 0) {
            clearInterval(codeV)
            _this.setData({
              btntext: '获取验证码',
              buttonType: 'primary',
              buttonDisabled: false
            })
          }
        }, 1000) 
      }
    })
  },
  formSubmit (e) {
    if (!e.detail.value.password) {
      wx.showToast({
        title: '请输入登陆密码',
        icon: 'none'
      })
    } else if (!e.detail.value.code) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
    } else {
      let para = {
        orderId: this.data.orderId,
        amount: e.detail.value.amount,
        verCode: e.detail.value.code,
        desc: '',
        passWord: md5.hexMD5(e.detail.value.password + app.globalData.userInfo.account),
        role: app.globalData.userInfo.role,
        roleId: app.globalData.userInfo.roleId
      }
      api.refund(para).then(res => {
        if (res.status === 200) {
          wx.showToast({
            title: '退款成功',
            icon: 'success',
            duration: 2000,
            success:function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          })
        }
      })
    }
  }
})