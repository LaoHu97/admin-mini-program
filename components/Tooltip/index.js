Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    tooltipText: {
      type: String,
      value: '提示文字'
    }
  },
  data: {
    textHidden: true
  },
  methods: {
    clickTooltip () {
      this.setData({
        textHidden: !this.data.textHidden
      })
    }
  }
})