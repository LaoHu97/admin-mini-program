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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getSuccessionDetails(options.id)
  },
  getSuccessionDetails(val) {
    let para = {
      mid: app.globalData.userInfo.mid,
      eid: app.globalData.userInfo.eid,
      worId: val
    }
    api.workOver(para).then(res => {
      this.setData({
        amountList: res.data.data.reocrd.slice(0, -1),
        totalAmount: res.data.data.total[0].money,
        startTime: res.data.data.time[0].type,
        endTime: res.data.data.time[1].type
      })
    })
  }
})