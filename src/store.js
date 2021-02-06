import Vue from 'vue'
import Vuex from 'vuex'
import { DateTime } from "luxon";

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
                message.timestamp = message.timestamp.toISO();
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
                state.messages = messages.map(message => {
                    if(message.timestamp) (typeof message.timestamp == 'object') && (message.timestamp = DateTime.fromObject(message.timestamp).toISO())
                    else message.timestamp = DateTime.local().toISO();
                    
                    if (!("myself" in message))
                        message.myself = message.participantId === state.myself.id;
                    return message
                });
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
                let messages = [];
                state.messages.forEach(message => {
                    let newMessage = {...message};
                    newMessage.timestamp = DateTime.fromISO(newMessage.timestamp);
                    messages.push(newMessage);
                });
                return messages;
            },
            myself: (state) => {
                return state.myself;
            }
        }
    })
}
