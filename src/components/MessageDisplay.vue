<template>
    <div class="contaier-message-display">
        <p v-for="(message, index) in messages" :key="index">{{message}}</p>
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
    justify-content: center;
    align-items: center;
    flex: 1;
}
</style>