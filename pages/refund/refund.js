const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../api/api')
const md5 = require('../../utils/md5')

Page({
  data: {
    orderId: '',
    amount: '',
    btntext: '获取验证码',
    buttonType: 'primary',
    buttonDisabled: false,
    stop: ''
  },
  onLoad(item) {
    console.log(item)
    this.setData({
      orderId: item.orderId,
      amount: item.amount
    })
  },
  code () {
    let _this = this
    let coden = 60
    let codeV = setInterval(function () {
      _this.setData({
        btntext: '重新获取' + (--coden) + 's'
      })
      if (coden == 0 || _this.data.stop) {
        clearInterval(codeV)
        _this.setData({
          btntext: '获取验证码',
          buttonType: 'primary',
          buttonDisabled: false
        })
      }
    }, 1000)
  },
  clickCode() {
    let para = {
      mid: app.globalData.userInfo.mid,
      sid: app.globalData.userInfo.sid,
      orderId: this.data.orderId
    }
    api.sendVerCodeT(para).then(res => {
      if (res.status === 200) {
        this.code()
        this.setData({
          btntext: '重新获取60s',
          buttonType: 'default',
          buttonDisabled: true,
          stop: ''
        })
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
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      let para = {
        orderId: this.data.orderId,
        amount: e.detail.value.amount || this.data.amount,
        verCode: e.detail.value.code,
        desc: '',
        passWord: md5.hexMD5(e.detail.value.password + app.globalData.userInfo.account),
        role: app.globalData.userInfo.role,
        roleId: app.globalData.userInfo.roleId
      }
      api.refund(para).then(res => {
        this.setData({
          stop: 'stop'
        })
        if (res.status === 200) {
          wx.hideLoading()
          wx.showToast({
            title: '退款成功',
            icon: 'success',
            duration: 2000,
            success:function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 2
                })
              }, 2000)
            }
          })
        }
      })
    }
  }
})