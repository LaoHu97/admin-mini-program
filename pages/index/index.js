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
      { name: '默认', value: ' ', checked: 'true' },
      { name: '微信', value: 'WX' },
      { name: '支付宝', value: 'ALI' },
      { name: '翼支付', value: 'BEST' },
      { name: '贷记卡', value: 'CREDIT' },
      { name: '借记卡', value: 'DEBIT' },
      { name: '银联二维码', value: 'UNIONPAY' }
    ],
    pageStatusRadioItems: [
      { name: '默认', value: '2', checked: 'true' },
      { name: '收款成功', value: '0' },
      { name: '退款成功', value: '1' }
    ],
    startTime: '00:00',
    endTime: '23:59',

    storeName: '',
    storeNameHidden: false,
    storeValue: '',
    payWay: '',
    orderType: '2',
    pageNum: 1,
    numPerPage: 10,
    allPage: 0,  // 总条数
    loadDone: true,

    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,

    sumAmt: 0,
    countRow: 0,

    startDatePick1: '',
    endDatePick1: '',
    startDatePick2: '',
    endDatePick2: ''
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '交易查询'
    })
    this.setData({
      storeName: app.globalData.userInfo.sid ? '全部款台' : '全部门店',
      storeNameHidden: app.globalData.userInfo.eid ? true : false
    })
    computed(this, {

    })
    watch(this, {
      currentTab(val){
        if (val === '1') {
          this.setData({
            startDatePick1: util.dateFormat(Date.parse(new Date()) - 90*24*60*60*1000, 'YYYY-MM-DD'),
            endDatePick1: util.dateFormat(Date.parse(new Date()) - 24*60*60*1000, 'YYYY-MM-DD'),
            startDatePick2: util.dateFormat(Date.parse(new Date()) - 90*24*60*60*1000, 'YYYY-MM-DD'),
            endDatePick2: util.dateFormat(Date.parse(new Date()) - 24*60*60*1000, 'YYYY-MM-DD')
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
  onShow: function () {
    // 页面显示
    let vm = this
    wx.getSystemInfo({
      success: function (res) {
        vm.setData({
          windowHeight: res.windowHeight
        })
        vm.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })
    try {
      vm.setData({
        storeName: app.globalData.storeData.target.dataset.item.value || ' ',
        storeValue: app.globalData.storeData.target.dataset.item.id || app.globalData.storeData.target.dataset.item.eid
      })
    } catch (error) {
      console.log('选择全部门店')
    }
    this.getUserList()
  },
  bindPickerChange: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    let startTime = ''
    let endTime = ''
    if (e.target.dataset.current == 0) {
      startTime = '00:00',
      endTime = '23:59'
    }else{
      startTime = util.dateFormat(Date.parse(new Date()) - 24*60*60*1000, 'YYYY-MM-DD'),
      endTime = util.dateFormat(Date.parse(new Date()) - 24*60*60*1000, 'YYYY-MM-DD')
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
    this.setData({
      pageShowDialog: false
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
      payWay: this.data.payWay,
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
  queryRealtime (item) {
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
  queryHistory (item) {
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
    console.log(e)
    this.setData({
      payWay: e.detail
    })
  },
  onMyStatusEvent(e) {
    this.setData({
      orderType: e.detail
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
  bindscrolltolower() {
    console.log('我被拉到地步了')
    console.log(`总条数：${this.data.allPage}`);
    console.log(`列表条数：${this.data.pageListObjectArray.length}`)
    
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
  bindscrolltoupper() {
    console.log('我被拉到顶部了')
    this.setData({
      pageNum: '1'
    })
    this.getUserList()
  }
})
