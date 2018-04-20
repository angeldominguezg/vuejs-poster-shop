var PRICE = 9.99
var LOAD_NUM = 10
new Vue({
  el: '#app',
  data() {
    return {
      total: 0,
      items: [],
      cart: [],
      results: [],
      newSearch: 'anime',
      lastSearch: '',
      loading: false,
      price: 9.99
    }
  },
  methods: {
    onSubmit() {
      if (this.newSearch !== '') {
        this.items = []
        this.loading = true
        this.$http
          .get(`/search/${this.newSearch}`)
          .then(response => {
            console.log('[onSubmit] then', response.data)
            this.lastSearch = this.newSearch
            this.results = response.data
            this.items = response.data.slice(0,LOAD_NUM)
            this.loading = false
          })
          .catch(err => {
            console.log('[onSubmit] catch', err)
            this.loading = false
          })
      }
    },
    addItem(index) {
      this.total += PRICE
      let item = this.items[index]
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === item.id) {
          this.cart[i].qty++
          return
        }
      }
      this.cart.push({
        id: item.id,
        title: item.title,
        qty: 1,
        price: PRICE
      })
    },
    inc(item) {
      console.log('[inc]', item)
      item.qty++
      this.total += PRICE
    },
    dec(item) {
      console.log('[dec]', item)
      item.qty--
      this.total -= PRICE
      if (item.qty <= 0) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1)
            break
          }
        }
      }
    }
  },
  filters: {
    currency: function(price) {
      return '$ ' + price.toFixed(2)
    }
  },
  mounted: function() {
    console.log('[mounted]')
    this.onSubmit()
  }
})
