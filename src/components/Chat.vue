<template>
    <div class="container">
        <Header/>
    </div>
</template>
<script>
import Header from './Header.vue'
export default {
    components:{
        Header
    }
}
</script>

<style scoped>
.container{
    display: flex;
    width: 350px;
    height: 500px;
    background: #f0eeee;
    /*border: solid 1px #b6b2b2;*/
}
</style>