var PRICE = 9.99
new Vue({
  el: '#app',
  data() {
    return {
      total: 0,
      items: [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' }
      ],
      cart: [],
      search: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.search !== '') {
        this.$http
          .get(`/search/${this.search}`)
          .then(response => {
            console.log('[onSubmit] then', response)
          })
          .catch(err => {
            console.log('[onSubmit] catch', err)
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
  }
})
