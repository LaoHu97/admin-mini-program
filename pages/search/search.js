const app = getApp()
const api = require('../../api/api')

Page({
  data: {
    searchInputValue: '',
    mapList: [],
    searchResult: true,
    storeName: '全部门店',
    inputPlaceholder: ''
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '搜索'
    })
  },
  onShow:function () {
    this.setData({
      storeName: app.globalData.userInfo.sid ? '全部款台' : '全部门店',
      inputPlaceholder: app.globalData.userInfo.sid ? '请输入款台名称关键字' : '请输入门店名称关键字'
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
      mid: app.globalData.userInfo.mid,
      sname: this.data.searchInputValue
    }
    let value = {
      storeId: app.globalData.userInfo.sid,
      ename: this.data.searchInputValue
    }
    console.log(app.globalData.userInfo);
    if (app.globalData.userInfo.role ==='shop') {
      this.getStore(para) 
    } else {
      this.getEmp(value)
    }
  },
  getStore (val) {
    api.queryStoreByName(val).then(res=>{
      if (res.status === 200) {
        this.setData({
          mapList: res.data.storeList,
          searchResult: true
        })
      } else {
        this.setData({
          searchResult: false
        })
      }
    })
  },
  getEmp (val) {
    api.queryEmpByName(val).then(res=>{
      if (res.status === 200) {
        this.setData({
          mapList: res.data.emplyeeList,
          searchResult: true
        })
      } else {
        this.setData({
          searchResult: false
        })
      }
    })
  },
  tapMapsScrollView (item) {
    app.globalData.storeData = item || null
    wx.switchTab({
      url: '../index/index'
    })
  }
})