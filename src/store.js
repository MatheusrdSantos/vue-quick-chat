import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex);

export default () => {
    return new Vuex.Store({
        state: {
            messages: [],
            myself: {},
            participants: [],
            chatTitle: '',
            placeholder: ''
        },
        mutations: {
            newMessage: (state, message) => {
                message.timestamp = moment(message.timestamp);
                message.myself = message.participantId === state.myself.id;
                state.messages = [...state.messages, message];
            },
            setParticipants: (state, participants) => {
                state.participants = participants;
            },
            setMyself: (state, myself) => {
                state.myself = myself;
            },
            setMessages: (state, messages) => {
                messages.map(message => {
                    message.timestamp = moment(message.timestamp);
                    message.myself = message.participantId === state.myself.id;
                });
                state.messages = messages;
            },
            setChatTitle: (state, title) => {
                state.chatTitle = title;
            },
            setPlaceholder: (state, placeholder) => {
                state.placeholder = placeholder;
            }
        },
        actions: {},
        getters: {
            getParticipantById: (state) => (id) => {
                let curr_participant;
                state.participants.forEach(participant => {
                    if (participant.id === id) {
                        curr_participant = participant;
                    }
                });

                return curr_participant;
            },
            messages: (state) => {
                return state.messages;
            },
            myself: (state) => {
                return state.myself;
            }
        }
    })
}
