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
export default {
    name: 'Chat',
    components:{
        Header,
        MessageDisplay,
        MessageManager
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
}
</style>