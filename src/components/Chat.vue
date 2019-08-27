<template>
    <div class="container">
        <Header/>
        <MessageDisplay/>
        <MessageManager/>
    </div>
</template>
<script>
import Header from './Header.vue'
import MessageDisplay from './MessageDisplay.vue'
import MessageManager from './MessageManager.vue'
import { mapMutations } from 'vuex';
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
        }
    },
    methods: {
        ...mapMutations([
            'setParticipants',
            'setMyself',
            'setMessages'
        ])
    },
    mounted(){
        this.setParticipants(this.participants);
        this.setMyself(this.myself);
        this.setMessages(this.messages);
    }
}
</script>

<style scoped>
.container{
    display: flex;
    width: 350px;
    height: 500px;
    background: #f0eeee;
    flex-direction: column;
    align-items: stretch;
    /*border: solid 1px #b6b2b2;*/
    overflow: hidden;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
</style>