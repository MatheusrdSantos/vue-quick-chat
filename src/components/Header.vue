<template>
    <div class="header-container">
        <div class="header-title">
            <p class="header-title-text">Chat title</p>
        </div>

        <div class="header-exit">
            <a class="header-exit-button" href="#"><v-icon name="x" base-class="icon-close-chat"></v-icon></a>
        </div>
    </div>    
</template>
<script>
export default {
    
}
</script>

<style scoped>
.header-container{
    background: #d30303;
    height: 70px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    padding: 0 20px 0 10px;
    align-items: center;
    -webkit-box-shadow:  0px 2px 20px 2px rgba(90, 90, 90, 0.47);
    box-shadow: 0px 2px 20px 2px rgba(90, 90, 90, 0.47);
    z-index: 5;
}
.header-title{
    padding: 10px;
    flex:1;
    text-align: left;
}

.header-title-text{
    color: #fff;
}

.header-exit{

}
.header-exit-button{
    text-decoration: none;
    color: #fff;
    width: 20px;
}

.icon-close-chat{
    color:#fff;
    width: 20px;
}
.icon-close-chat:hover{
    color:rgb(238, 121, 121)
}

</style>
