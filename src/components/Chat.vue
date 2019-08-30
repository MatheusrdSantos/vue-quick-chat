<template>
    <div class="quick-chat-container" :style="{'border-bottom-left-radius': borderStyle.bottomLeft, 'border-bottom-right-radius': borderStyle.bottomRight, 'border-top-right-radius': borderStyle.topRight, 'border-top-left-radius': borderStyle.topLeft}">
        <Header :colors="colors" :borderStyle="borderStyle" :hideCloseButton="hideCloseButton" :closeButtonIconSize="closeButtonIconSize"/>
        <MessageDisplay :colors="colors"/>
        <MessageManager :onType="onType" :onMessageSubmit="onMessageSubmit" :colors="colors" :borderStyle="borderStyle" :submitIconSize="submitIconSize"/>
    </div>
</template>
<script>
import Header from './Header.vue'
import MessageDisplay from './MessageDisplay.vue'
import MessageManager from './MessageManager.vue'
import { mapMutations } from 'vuex'
import store from '../store'
export default {
    name: 'Chat',
    store,
    components:{
        Header,
        MessageDisplay,
        MessageManager
    },
    props: {
        participants: {
            type: Array,
            required: true
        },
        messages: {
            type: Array,
            required: true
        },
        myself: {
            type: Object,
            required: true
        },
        chatTitle:{
            type: String,
            required: false,
            default: ''
        },
        placeholder: {
            type: String,
            required: false,
            default: 'type your message here'
        },
        onType: {
            type: Function,
            required: false,
            default: () => false
        },
        onMessageSubmit: {
            type: Function,
            required: false,
            default: () => false
        },
        colors: {
            type: Object,
            required: true
        },
        borderStyle: {
            type: Object,
            required: false,
            default: () =>{
                return {
                    topLeft: "10px",
                    topRight: "10px",
                    bottomLeft: "10px",
                    bottomRight: "10px",
                }
            }
        },
        hideCloseButton: {
            type: Boolean,
            required: false,
            default: false
        },
        submitIconSize: {
            type: String,
            required: false,
            default: "15px"
        },
        closeButtonIconSize: {
            type: String,
            required: false,
            default: "15px"
        }
    },
    methods: {
        ...mapMutations([
            'setParticipants',
            'setMyself',
            'setMessages',
            'setPlaceholder',
            'setChatTitle'
        ])
    },
    mounted(){
        this.setParticipants(this.participants);
        this.setMyself(this.myself);
        this.setMessages(this.messages);
        this.setPlaceholder(this.placeholder);
        this.setChatTitle(this.chatTitle);
    }
}
</script>

<style scoped>
.quick-chat-container{
    display: flex;
    /* width: 350px;
    height: 500px; */
    width: 100%;
    height: 100%;
    background: #f0eeee;
    flex-direction: column;
    align-items: stretch;
    /*border: solid 1px #b6b2b2;*/
    overflow: hidden;
}
</style>