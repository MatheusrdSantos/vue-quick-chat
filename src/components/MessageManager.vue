<template>
    <div class="container-message-manager">
        <div class="message-text-box">
            <textarea class="message-input" type="text" name="" id="" placeholder="type your message here"/>
        </div>
        <div class="container-send-message">
            <v-icon name="send" base-class="icon-send-message"></v-icon>
        </div>
    </div>    
</template>
<script>
export default {
    
}
</script>
<style scoped>
.container-message-manager{
    height: 50px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px 0 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    -webkit-box-shadow: 0px -2px 40px 0px rgba(186,186,186,0.67);
    box-shadow: 0px -2px 40px 0px rgba(186,186,186,0.67);
}
.message-text-box{
    padding: 0 10px 0 10px;
    flex: 1;
}
.message-input{
    /* border: solid 1px #b9b5b5; */
    border: none;
    border-radius: 5px;
    overflow: hidden;
    height: 40px;
    resize: none;
    width: 100%;
    font-size: 15px;
    line-height: 30px;
    vertical-align: center;
}
.message-input:focus{
    outline: none;
}

.container-send-message{
    margin-left: 10px;
}

.icon-send-message{
    color:#b91010;
    width: 20px;
}
.icon-send-message:hover{
    color:rgb(238, 121, 121)
}
</style>