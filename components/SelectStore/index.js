Component({
  properties: {
    showDialog: {
      type: Boolean,
      value: false
    }
  },
  data: {
    array: [{
      id: 0,
      name: '默认'
    },
    {
      id: 1,
      name: '中国'
    },
    {
      id: 2,
      name: '巴西'
    },
    {
      id: 3,
      name: '日本'
    }],
    index: 0
  },
  methods: {
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    }
  }
})