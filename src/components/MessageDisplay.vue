<template>
    <div class="contaier-message-display">
        <div v-for="(message, index) in messages" :key="index" class="message-container" :class="{'my-message': message.myself, 'other-message': !message.myself}">
            <div class="message-text" >
                <p>{{message.content}}</p>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    computed: {
        messages: function(){
            return this.$store.state.messages;
        }
    }
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
    border-radius: 5px;
    margin: 5px 0 5px 0;
    max-width: 70%;
    overflow-wrap: break-word;
    text-align: left;
}

.my-message{
    justify-content: flex-end;
    padding-right: 15px;
}

.other-message{
    justify-content: flex-start;
    padding-left: 15px;
}
.other-message >.message-text{
    background: #fb4141;
    color: #fff;
}
.message-container{
    display: flex;
}
</style>