<template>
    <div class="contaier-message-display">
        <div v-for="(message, index) in messages" :key="index" :class="{'my-message': message.myself}">
            <div class="message-text ">
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
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* align-items: center; */
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
}
.message-text{
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0 10px 0;
}

.my-message{
    align-self: flex-end;
}
</style>