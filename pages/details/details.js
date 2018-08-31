//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../api/api')

Page({
  data: {
    detailsArray: [],
    isHistory: true,
    orderId: ''
  },
  onLoad: function (item) {
    wx.setNavigationBarTitle({
      title: '交易详情'
    })
    this.setData({
      orderId: item.orderId
    })
    console.log(item)
    if (item.type === '0') {
      api.queryOrderRealtimeDetail({ orderId: item.id }).then(res => {
        if (res.status === 200) {
          let list = []
          list.push(
            { name: '收款金额', value: res.data.order.goodsPrice + '元' },
            { name: '退款金额', value: res.data.order.refundAmount + '元' },
            { name: '支付方式', value: util.formatPayment(res.data.order.payWay) },
            { name: '门店名称', value: res.data.order.storeName },
            { name: '终端名称', value: res.data.order.username },
            { name: '终端流水', value: res.data.order.transactionId },
            { name: '日期', value: util.formatTime(res.data.order.payTime) },
            { name: '订单号', value: res.data.order.orderId }
          )
          this.setData({
            detailsArray: list,
            isHistory: true
          })
        }
      })
    } else {
      api.queryOrderDetail({ orderId: item.id }).then(res => {
        if (res.status === 200) {
          let list = []
          list.push(
            { name: '收款金额', value: res.data.order.goodsPrice + '元' },
            { name: '退款金额', value: res.data.order.refundAmount + '元' },
            { name: '支付方式', value: util.formatPayment(res.data.order.payWay) },
            { name: '门店名称', value: res.data.order.storeName },
            { name: '终端名称', value: res.data.order.username },
            { name: '终端流水', value: res.data.order.transactionId },
            { name: '日期', value: util.formatTime(res.data.order.payTime) },
            { name: '订单号', value: res.data.order.orderId }
          )
          this.setData({
            detailsArray: list,
            isHistory: false
          })
        }
      })
    }
  },
  navigateBackto () {
    wx.navigateBack({
      delta: 1
    })
  },
  refundClick() {
    wx.navigateTo({
      url: '../refund/refund?orderId=' + this.data.orderId 
    })
  }
})