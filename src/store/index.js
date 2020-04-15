import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const cart = window.localStorage.getItem('cart')

export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : [],
    admin: process.env.ADMIN || false
  },

  mutations: {
    addToCart (state, item) {
      state.cart.push(item)
    },
    removeFromCart (state, item) {
      let index = state.cart.indexOf(item);
      if (index > -1) {
          state.cart.splice(index, 1);
      }
    },
    saveCart (state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  }
})
