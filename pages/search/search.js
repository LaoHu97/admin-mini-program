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
  onShow:function () {
    this.setData({
      storeName: app.globalData.userInfo.loginUserInfo.role === 'store' ? '全部款台' : '全部门店',
      inputPlaceholder: app.globalData.userInfo.loginUserInfo.role === 'store' ? '请输入款台名称关键字' : '请输入门店名称关键字'
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
      mid: app.globalData.userInfo.loginUserInfo.role_id.toString(),
      sname: this.data.searchInputValue
    }
    let value = {
      storeId: app.globalData.userInfo.loginUserInfo.role_id.toString(),
      ename: this.data.searchInputValue
    }
    if (app.globalData.userInfo.loginUserInfo.role ==='shop') {
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
          searchResult: res.data.storeList.length ? true : false
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
          searchResult: res.data.emplyeeList.length ? true : false
        })
      } else {
        this.setData({
          searchResult: false
        })
      }
    })
  },
  tapMapsScrollView (item) {
    console.log(item);
    
    app.globalData.storeData = item.currentTarget.dataset.item || null
    wx.switchTab({
      url: '../index/index'
    })
  }
})