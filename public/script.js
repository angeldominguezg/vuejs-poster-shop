new Vue ({
  el: '#app',
  data() {
    return {
      total: 0,
      items: [
        {title: 'Item 1'},
        {title: 'Item 2'},
        {title: 'Item 3'}
      ]
    }
  },
  methods: {
    addItem () {
      console.log('[addItem]', this.articleName)
    }
  }

})