import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    newMessage: (state, message) => {
      state.messages.push(message);
    }
  },
  actions: {

  }
})
