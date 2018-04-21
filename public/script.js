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
      newSearch: '90s',
      lastSearch: '',
      loading: false,
      price: 9.99
    }
  },
  methods: {
    appendItems() {
      if (this.items.length < this.results.length) {
        console.log('[appendItems]')
        let append = this.results.slice(
          this.items.length,
          this.items.length + LOAD_NUM
        )
        this.items = this.items.concat(append)
      }
    },
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
            this.appendItems()
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
  computed: {
    noMoreItems () {
      return this.items.length === this.results.length && this.results.length > 0
    }
  },
  mounted: function() {
    console.log('[mounted]')
    this.onSubmit()

    // setupt scrollMonitor
    const vueInstance = this
    const el = document.getElementById('product-list-bottom')
    const watcher = scrollMonitor.create(el)
    watcher.enterViewport(() => {
      console.log('Enter to viewport!')
      vueInstance.appendItems()
    })
  }
})
