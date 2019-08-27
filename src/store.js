import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [
      {
        content: 'testing style for received messages', 
        myself: false
      },
      {
        content: 'testing style for sent messages', 
        myself: true
      }
    ]
  },
  mutations: {
    newMessage: (state, message) => {
      state.messages = [message, ...state.messages];
    }
  },
  actions: {

  }
})
