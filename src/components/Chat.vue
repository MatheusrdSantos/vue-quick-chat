<template>
    <div class="container">
        <Header/>
        <MessageDisplay/>
    </div>
</template>
<script>
import Header from './Header.vue'
import MessageDisplay from './MessageDisplay.vue'
export default {
    name: 'Chat',
    components:{
        Header,
        MessageDisplay
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