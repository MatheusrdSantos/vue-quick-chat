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

  },
  getters: {
    getParticipantById: (state) => (id) => {
      let curr_participant;
      state.participants.forEach(participant => {
        if(participant.id == id){
          curr_participant = participant;
        }
      })

      return curr_participant;
    }
  }
})
