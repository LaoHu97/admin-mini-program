const app = getApp()
const api = require('../../api/api')

Page({
  data: {
    searchInputValue: '',
    mapList: [],
    searchResult: true
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '门店搜索'
    })
  },
  searchInput (e) {
    this.setData({
      searchInputValue: e.detail.value
    })
  },
  delText () {
    this.setData({
      searchInputValue: ''
    })
  },
  getMapList () {
    let para = {
      // mid: app.globalData.userInfo.mid,
      mid: '200',
      sname: this.data.searchInputValue
    }
    api.queryStoreByName(para).then(res=>{
      if (res.status === 200) {
        this.setData({
          mapList: res.data.storeList,
          searchResult: true
        })
      } else {
        this.setData({
          mapList: res.data.storeList,
          searchResult: false
        })
      }
    })
  },
  tapMapsScrollView (item) {
    app.globalData.storeData = item
    wx.switchTab({
      url: '../index/index'
    })
  }
})