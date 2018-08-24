Component({
  properties: {
    showDialog: {
      type: Boolean,
      value: false
    }
  },
  data: {
    // 这里是一些组件内部数据
    // showDialog: true
  },
  methods: {
    // 这里是一个自定义方法
    // 控制 pop 的打开关闭
    toggleDialog() {
      this.setData({
        showDialog: !this.data.showDialog
      })
      wx.showTabBar({
        animation: true
      })
    }
  }
})