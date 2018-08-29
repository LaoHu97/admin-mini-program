//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    detailsArray: [
      {name: '收款金额', value: '36.83'},
      {name: '退款金额', value: '0'},
      {name: '支付方式', value: '微信'},
      {name: '门店名称', value: '长乐坡加气站'},
      {name: '终端名称', value: '长乐坡油枪3'},
      {name: '终端流水', value: 'g12311231232132131232131231231231'},
      {name: '日期', value: '2018-8-28'},
      {name: '订单号', value: '12333333333333333333333'}
    ]
  },
  onLoad: function () {
    // Do some initialize when page load.
    wx.setNavigationBarTitle({
      title: '交易详情'
    })
  },
})