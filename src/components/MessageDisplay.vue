<template>
    <div class="contaier-message-display">
        <div v-for="(message, index) in messages" :key="index" class="message-container" :class="{'my-message': message.myself, 'other-message': !message.myself}">
            <div class="message-text" :style="{background: !message.myself?colors.message.others.bg: colors.message.myself.bg}">
                <p v-if="!message.myself" class="message-username">{{getParticipantById(message.participantId).name}}</p>
                <p v-else class="message-username">{{myself.name}}</p>
                <p>{{message.content}}</p>
            </div>
            <div class="message-timestamp">
                {{ message.timestamp.format('LT') }}
            </div>
        </div>
    </div>    
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props:{
        colors: {
            type: Object,
            required: true
        },
    },
    computed: {
        ...mapGetters([
            'getParticipantById'
        ]),
        messages: function(){
            return this.$store.state.messages;
        },
        myself: function(){
            return this.$store.state.myself;
        }
    },
}
</script>

<style scoped>
.contaier-message-display{
    /* display: flex;
    flex-direction: column;
    justify-content: flex-end; */
    /* align-items: center; */
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 10px;
}
.message-text{
    background: #fff;
    padding: 2px 7px;
    border-radius: 15px;
    margin: 5px 0 5px 0;
    max-width: 70%;
    overflow-wrap: break-word;
    text-align: left;
}

.message-timestamp{
    padding: 2px 7px;
    border-radius: 15px;
    margin: 0;
    max-width: 50%;
    overflow-wrap: break-word;
    text-align: left;
    font-size: 10px;
    color: #bdb8b8;
    width: 100%;
}

.my-message >.message-timestamp{
    text-align: right;
}

.my-message{
    justify-content: flex-end;
    padding-right: 15px;
    align-items: flex-end;
}

.other-message{
    justify-content: flex-start;
    padding-left: 15px;
    align-items: flex-start;
}

.other-message >.message-text{
    /* background: #fb4141;  */
    color: #fff;
    border-bottom-left-radius: 0px;
}

.my-message >.message-text{
    border-bottom-right-radius: 0px;
}
.message-container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.message-username{
    font-size: 10px;
    font-weight: bold;
}
</style>