const app = getApp()
const api = require('../../api/api')
const util = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    successionList: [],
    startTime: '',
    endTime: '',
    pageNum: 1,
    numPerPage: 10,
    allPage: 0, // 总条数
    loadDone: true,
    windowHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      startTime: util.dateFormat(Date.parse(new Date()), 'YYYY-MM-DD'),
      endTime: util.dateFormat(Date.parse(new Date()), 'YYYY-MM-DD')
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let vm = this
    wx.getSystemInfo({
      success: function (res) {
        vm.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    this.getSuccessiondetails()
  },
  submiltSuccession() {
    let startTime = Date.parse(this.data.startTime.replace(/-/g, '/') + ' ' + '00:00:00')
    let endTime = Date.parse(this.data.endTime.replace(/-/g, '/') + ' ' + '23:59:59')
    if (startTime > endTime) {
      wx.showToast({
        title: '结束时间不能小于起始时间',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      successionList: [],
      pageNum: 1,
      allPage: 0
    })
    this.getSuccessiondetails()
  },

  getSuccessiondetails() {
    let para = {
      mid: app.globalData.userInfo.mid,
      eid: app.globalData.userInfo.eid,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      pageNo: this.data.pageNum,
      pageSize: this.data.numPerPage,
    }
    para.startTime = Date.parse(this.data.startTime.replace(/-/g, '/') + ' ' + '00:00:00').toString()
    para.endTime = Date.parse(this.data.endTime.replace(/-/g, '/') + ' ' + '23:59:59').toString()
    api.pagingWorkOver(para).then(res => {
        if (this.data.pageNum == 1) {
          let comms = res.data.data.orderList
          for (let i = 0; i < comms.length; i++) {
            comms[i].startTime = util.formatTime(comms[i].startTime);
            comms[i].endTime = util.formatTime(comms[i].endTime);
          }
          this.setData({
            successionList: comms || [],
            allPage: res.data.data.totalCount,
            loadDone: res.data.data.totalCount <= 10 ? false : true
          })
        } else {
          let comms = res.data.data.orderList
          for (let i = 0; i < comms.length; i++) {
            comms[i].startTime = util.formatTime(comms[i].startTime);
            comms[i].endTime = util.formatTime(comms[i].endTime);
          }
          let list = this.data.successionList
          list = list.concat(comms)
          this.setData({
            successionList: list || [],
            allPage: res.data.data.totalCount,
          })
        }
    })
  },
  bindscrolltolower() {
    if (this.data.allPage == this.data.successionList.length) {
      this.setData({
        loadDone: false
      })
      return
    }
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getSuccessiondetails()
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.setData({
      pageNum: 1
    })
    this.getSuccessiondetails()
    setTimeout(() => {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 800)
  },
  successionTap(e) {
    console.log(e)
    wx.navigateTo({
      url: `../successiondetails/successiondetails?id=${e.target.dataset.id}`
    })
  },
  bindStartDateChange(e) {
    console.log(e)
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndDateChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  }
})