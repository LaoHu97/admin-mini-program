Component({
  properties: {
    radioItems: {
      type: Array,
      value: []
    }
  },
  data: {
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