import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    myself:{},
    participants: []
  },
  mutations: {
    newMessage: (state, message) => {
      state.messages = [message, ...state.messages];
    },
    setParticipants: (state, participants) => {
      state.participants = participants;  
    },
    setMyself: (state, myself) => {
      state.myself = myself;
    },
    setMessages: (state, messages) => {
      state.messages = messages;
    }
  },
  actions: {

  }
})
