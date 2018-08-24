Component({
  properties: {
    radioItems: {
      type: Array,
      value: []
    }
  },
  data: {
    // radioItems: [
    //   {name: '全部', value: 'a'},
    //   {name: '微信', value: 'b', checked: 'true'},
    //   {name: '支付宝', value: 'c'},
    //   {name: '翼支付', value: 'd'},
    //   {name: '贷记卡', value: 'e'},
    //   {name: '借记卡', value: 'f'},
    //   {name: '银联二维码', value: 'g'}
    // ],
    hidden: false
  },
  methods: {
    radioChangeDone (e) {
      this.triggerEvent('myevent', e)
    },
    radioChange: function(e) {
      let checked = e.detail.value
      let changed = {}
      for (let i = 0; i < this.data.radioItems.length; i ++) {
        if (checked.indexOf(this.data.radioItems[i].value) !== -1) {
          changed['radioItems['+i+'].checked'] = true
        } else {
          changed['radioItems['+i+'].checked'] = false
        }
      }
      this.setData(changed, this.radioChangeDone(checked))
    }
  }
})