//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    pageListObjectArray: [
      { name: '微信支付收款成功', date: '2018-8-28 10:10:00', amount: '45' },
      { name: '支付宝收款成功', date: '2018-8-28 10:10:00', amount: '45' },
      { name: '翼支付收款成功', date: '2018-8-28 10:10:00', amount: '45' },
      { name: '贷记卡收款成功', date: '2018-8-28 10:10:00', amount: '45' },
      { name: '借记卡收款成功', date: '2018-8-28 10:10:00', amount: '45' },
      { name: '银联二维码收款成功', date: '2018-8-28 10:10:00', amount: '45' },
      { name: '翼支付收款成功', date: '2018-8-28 10:10:00', amount: '45' },
      { name: '贷记卡收款成功', date: '2018-8-28 10:10:00', amount: '45' },
      { name: '借记卡收款成功', date: '2018-8-28 10:10:00', amount: '45' },
      { name: '银联二维码收款成功', date: '2018-8-28 10:10:00', amount: '45' }
    ],
    pageMentRadioItems: [
      { name: '默认', value: 'a', checked: 'true' },
      { name: '微信', value: 'b' },
      { name: '支付宝', value: 'c' },
      { name: '翼支付', value: 'd' },
      { name: '贷记卡', value: 'e' },
      { name: '借记卡', value: 'f' },
      { name: '银联二维码', value: 'g' }
    ],
    pageStatusRadioItems: [
      { name: '默认', value: 'c', checked: 'true' },
      { name: '收款成功', value: 'd' },
      { name: '退款成功', value: 'e' }
    ],
    startDate: util.dateFormat(new Date(), 'YYYY-MM-DD'),
    endDate: util.dateFormat(new Date(), 'YYYY-MM-DD'),

    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0
  },
  onLoad: function () {
    // Do some initialize when page load.
    wx.setNavigationBarTitle({
      title: '交易查询'
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
  },

  /**
     * 滑动切换tab
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
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
  onMyMentEvent(e) {
    console.log(e)
  },
  onMyStatusEvent(e) {
    console.log(e)
  },
  bindStartDateChange(e) {
    console.log(e)
  },
  bindEndDateChange(e) {

  },
  bindscrolltolower() {
    console.log('我被拉到地步了')
  },
  bindscrolltoupper() {
    console.log('我被拉到顶部了')
  },
  clickPageList() {

  }
})
