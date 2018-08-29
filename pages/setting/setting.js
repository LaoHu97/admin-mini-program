//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '设置'
    })
  }
})
