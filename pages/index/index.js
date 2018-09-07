//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../api/api')
const { watch, computed } = require('../../utils/vuefy')

Page({
  data: {
    pageListObjectArray: [],
    pageMentRadioItems: [
      { name: '全部', value: 'ALL', checked: 'true' },
      { name: '微信', value: 'WX' },
      { name: '支付宝', value: 'ALI' },
      { name: '翼支付', value: 'BEST' },
      { name: '贷记卡', value: 'CREDIT' },
      { name: '借记卡', value: 'DEBIT' },
      { name: '银联二维码', value: 'UNIONPAY' }
    ],
    pageStatusRadioItems: [
      { name: '全部', value: '2', checked: 'true' },
      { name: '收款成功', value: '0' },
      { name: '退款成功', value: '1' }
    ],
    startTime: '00:00',
    endTime: '23:59',

    storeName: '全部门店',
    storeNameHidden: false,
    storeValue: '',
    payWay: '',
    orderType: '2',
    pageNum: 1,
    numPerPage: 10,
    allPage: 0,  // 总条数
    loadDone: true,

    // tab切换
    currentTab: 0,

    sumAmt: 0,
    countRow: 0,

    startDatePick1: '',
    endDatePick1: '',
    startDatePick2: '',
    endDatePick2: '',

    tooltipText: '注：交易金额等于收款金额减退款金额'
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.getUserList()
    } else {
      app.userInfoReadyCallback = res => {
        this.getUserList()
        this.setData({
          storeName: app.globalData.userInfo.sid ? '全部款台' : '全部门店',
          storeValue: '',
          storeNameHidden: app.globalData.userInfo.eid ? true : false
        })
      }
    }
    watch(this, {
      currentTab(val) {
        if (val === '1') {
          this.setData({
            startDatePick1: util.dateFormat(Date.parse(new Date()) - 90 * 24 * 60 * 60 * 1000, 'YYYY-MM-DD'),
            endDatePick1: util.dateFormat(Date.parse(new Date()) - 24 * 60 * 60 * 1000, 'YYYY-MM-DD'),
            startDatePick2: util.dateFormat(Date.parse(new Date()) - 90 * 24 * 60 * 60 * 1000, 'YYYY-MM-DD'),
            endDatePick2: util.dateFormat(Date.parse(new Date()) - 24 * 60 * 60 * 1000, 'YYYY-MM-DD')
          })
        } else {
          this.setData({
            startDatePick1: '',
            endDatePick1: '',
            startDatePick2: '',
            endDatePick2: ''
          })
        }
      }
    })
  },
  onHide: function () {
    app.resetSubmit = res => {
      this.resetSubmit()
    }
  },
  onShow: function () {
    // 页面显示
    let vm = this
    wx.getSystemInfo({
      success: function (res) {
        vm.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    if (app.globalData.storeData) {
      this.setData({
        storeName: app.globalData.storeData.value,
        storeValue: app.globalData.storeData.id
      })
    } else {
      this.setData({
        storeName: app.globalData.userInfo.sid ? '全部款台' : '全部门店',
        storeValue: ''
      })
    }
    this.getUserList()
  },
  bindPickerChange: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  swichNav: function (e) {
    let startTime = ''
    let endTime = ''
    if (e.target.dataset.current == 0) {
      startTime = '00:00'
      endTime = '23:59'
    } else {
      startTime = util.dateFormat(Date.parse(new Date()) - 24 * 60 * 60 * 1000, 'YYYY-MM-DD')
      endTime = util.dateFormat(Date.parse(new Date()) - 24 * 60 * 60 * 1000, 'YYYY-MM-DD')
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
        pageListObjectArray: [],
        pageNum: 1,
        allPage: 0,
        startTime: startTime,
        endTime: endTime
      })
      this.getUserList()
    }
  },
  clickSearch() {
    this.setData({
      pageShowDialog: true
    })
    wx.hideTabBar({
      animation: true
    })
  },
  searchSubmit() {
    let startTime = ''
    let endTime = ''
    if (this.data.currentTab == 0) {
      startTime = Date.parse(util.dateFormat(new Date(), 'YYYY/MM/DD', '/') + ' ' + this.data.startTime + ':00').toString()
      endTime = Date.parse(util.dateFormat(new Date(), 'YYYY/MM/DD', '/') + ' ' + this.data.endTime + ':59').toString()
    } else {
      startTime = Date.parse(this.data.startTime.replace(/-/g, '/') + ' ' + '00:00:00').toString()
      endTime = Date.parse(this.data.endTime.replace(/-/g, '/') + ' ' + '23:59:59').toString()
    }
    if (startTime > endTime) {
      wx.showToast({
        title: '结束时间不能小于起始时间',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      pageShowDialog: false,
      pageListObjectArray: [],
      pageNum: 1,
      allPage: 0
    })
    wx.showTabBar({
      animation: true
    })
    this.getUserList()
  },
  getUserList() {
    let para = {
      mid: app.globalData.userInfo.mid,
      sid: app.globalData.userInfo.sid || this.data.storeValue.toString(),
      eid: app.globalData.userInfo.eid || this.data.storeValue.toString(),
      roleId: app.globalData.userInfo.roleId,
      role: app.globalData.userInfo.role,
      orderType: this.data.orderType,
      payWay: this.data.payWay === 'ALL' ? '' : this.data.payWay,
      pageNum: this.data.pageNum.toString(),
      numPerPage: this.data.numPerPage.toString()
    }
    if (this.data.currentTab == 0) {
      para.startTime = Date.parse(util.dateFormat(new Date(), 'YYYY/MM/DD', '/') + ' ' + this.data.startTime + ':00').toString()
      para.endTime = Date.parse(util.dateFormat(new Date(), 'YYYY/MM/DD', '/') + ' ' + this.data.endTime + ':59').toString()
      this.queryRealtime(para)
    } else {
      para.startTime = Date.parse(this.data.startTime.replace(/-/g, '/') + ' ' + '00:00:00').toString()
      para.endTime = Date.parse(this.data.endTime.replace(/-/g, '/') + ' ' + '23:59:59').toString()
      this.queryHistory(para)
    }
  },
  queryRealtime(item) {
    api.queryOrder(item).then(res => {
      if (res.status === 200) {
        if (this.data.pageNum == 1) {
          let comms = res.data.orderList
          for (let i = 0; i < comms.length; i++) {
            comms[i].createTime = util.formatTime(comms[i].createTime);
          }
          this.setData({
            pageListObjectArray: comms || [],
            allPage: res.data.totalCount,
            loadDone: res.data.totalCount <= 10 ? false : true,
            sumAmt: res.data.sumAmt,
            countRow: res.data.countRow
          })
        } else {
          let comms = res.data.orderList
          for (let i = 0; i < comms.length; i++) {
            comms[i].createTime = util.formatTime(comms[i].createTime);
          }
          let list = this.data.pageListObjectArray
          list = list.concat(comms)
          this.setData({
            pageListObjectArray: list || [],
            allPage: res.data.totalCount,
            sumAmt: res.data.sumAmt,
            countRow: res.data.countRow
          })
        }
      }
    })
  },
  queryHistory(item) {
    api.queryOrderHistory(item).then(res => {
      if (res.status === 200) {
        if (this.data.pageNum == 1) {
          let comms = res.data.orderList
          for (let i = 0; i < comms.length; i++) {
            comms[i].createTime = util.formatTime(comms[i].createTime);
          }
          this.setData({
            pageListObjectArray: comms || [],
            allPage: res.data.totalCount,
            loadDone: res.data.totalCount <= 10 ? false : true,
            sumAmt: res.data.sumAmt,
            countRow: res.data.countRow
          })
        } else {
          let comms = res.data.orderList
          for (let i = 0; i < comms.length; i++) {
            comms[i].createTime = util.formatTime(comms[i].createTime);
          }
          let list = this.data.pageListObjectArray
          list = list.concat(comms)
          this.setData({
            pageListObjectArray: list || [],
            allPage: res.data.totalCount,
            sumAmt: res.data.sumAmt,
            countRow: res.data.countRow
          })
        }
      }
    })
  },
  onMyMentEvent(e) {
    this.setData({
      payWay: e.detail
    })
  },
  onMyStatusEvent(e) {
    this.setData({
      orderType: e.detail,
      tooltipText: e.detail === '2' ? '注：交易金额等于收款金额减退款金额' : e.detail === '0' ? '注：交易金额等于收款金额' : e.detail === '1' ? '注：交易金额等于退款金额' : '注：暂无说明'
    })
  },
  bindStartDateChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndDateChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  resetSubmit () {
    let startTime = ''
    let endTime = ''
    
    if (this.data.currentTab == 0) {
      startTime = '00:00'
      endTime = '23:59'
    } else  if (this.data.currentTab == 1) {
      startTime = util.dateFormat(Date.parse(new Date()) - 24 * 60 * 60 * 1000, 'YYYY-MM-DD')
      endTime = util.dateFormat(Date.parse(new Date()) - 24 * 60 * 60 * 1000, 'YYYY-MM-DD')
    }
    this.setData({
      startTime : startTime,
      endTime : endTime,
      pageMentRadioItems: this.data.pageMentRadioItems,
      pageStatusRadioItems: this.data.pageStatusRadioItems
    })
  },
  bindscrolltolower() {
    if (this.data.allPage == this.data.pageListObjectArray.length) {
      this.setData({
        loadDone: false
      })
      return
    }
    this.setData({
      pageNum: parseInt(this.data.pageNum) + 1
    })
    this.getUserList()
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.setData({
      pageNum: '1'
    })
    this.getUserList()
    setTimeout(() => {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 800)
  }
})
