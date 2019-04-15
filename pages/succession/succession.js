const app = getApp()
const api = require('../../api/api')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    amountList: [],
    totalAmount: '',
    startTime: '',
    endTime: ''
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getSuccession()
  },
  getSuccession () {
    let para = {
      mid: app.globalData.userInfo.mid,
      eid: app.globalData.userInfo.eid
    }
    api.workOverRecord(para).then(res => {
      this.setData({
        amountList: res.data.data.reocrd.slice(0, -1),
        totalAmount: res.data.data.total[0].money,
        startTime: res.data.data.time[0].type,
        endTime: res.data.data.time[1].type
      })
    })
  },
  successionLogOut() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认交班退出？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let para = {
            mid: app.globalData.userInfo.mid,
            eid: app.globalData.userInfo.eid,
            name: app.globalData.userInfo.loginUserInfo.role_name
          }
          api.handover(para).then(res => {
            setTimeout(() => {
              wx.showToast({
                title: '交班成功',
                icon: 'success',
                duration: 2000
              })
            }, 800)
            that.getSuccession()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})