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
import store from '../store'
export default {
    name: 'Chat',
    store,
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
    overflow: hidden;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
</style>