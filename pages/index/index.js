//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    pageMentRadioItems: [
      {name: '默认', value: 'a', checked: 'true'},
      {name: '微信', value: 'b'},
      {name: '支付宝', value: 'c'},
      {name: '翼支付', value: 'd'},
      {name: '贷记卡', value: 'e'},
      {name: '借记卡', value: 'f'},
      {name: '银联二维码', value: 'g'}
    ],
    pageStatusRadioItems: [
      {name: '默认', value: 'c', checked: 'true'},
      {name: '收款成功', value: 'd'},
      {name: '退款成功', value: 'e'}
    ],
    startDate: util.dateFormat(new Date(), 'YYYY-MM-DD'),
    endDate: util.dateFormat(new Date(), 'YYYY-MM-DD')
  },
  onLoad: function () {
    // Do some initialize when page load.
    wx.setNavigationBarTitle({
      title: '交易查询'
    })
  },
  onShow:function(){
    // 页面显示
    let vm = this
    wx.getSystemInfo({
      success: function(res) {
        vm.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },
  clickSearch () {
    this.setData({
      pageShowDialog: true
    })
    wx.hideTabBar({
      animation: true
    })
  },
  onMyMentEvent (e) {
    console.log(e)
  },
  onMyStatusEvent (e) {
    console.log(e)
  },
  bindStartDateChange (e) {
    console.log(e)
  },
  bindEndDateChange (e) {

  }
})
