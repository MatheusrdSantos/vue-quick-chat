<template>
    <div class="container-message-manager">
        <div class="message-text-box">
            <div class="message-input" name="" id="" :placeholder="'type your message here'" tabIndex="0" contenteditable="true" ref="userInput"></div>
        </div>
        <div class="container-send-message" @click.prevent="sendMessage">
            <v-icon name="send" base-class="icon-send-message"></v-icon>
        </div>
    </div>    
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    data(){
        return {
            textInput: ''
        }
    },
    computed: {
        myself: function (){
            return this.$store.state.myself;
        }
    },
    methods: {
        ...mapMutations([
            'newMessage'
        ]),
        sendMessage: function(){
            this.textInput = this.$refs.userInput.textContent;
            this.$refs.userInput.textContent = '';
            if(this.textInput){
                this.newMessage({
                    content: this.textInput, 
                    myself: true, 
                    participantId: this.myself.id,
                    timestamp: new Date()
                })
            }
        }
    }
}
</script>
<style scoped>
.container-message-manager{
    height: 65px;
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
    overflow: hidden;
}
.message-input{
    /* border: solid 1px #b9b5b5; */
    /* border: none;
    border-radius: 5px;
    overflow: hidden;
    height: 40px;
    resize: none;
    width: 100%;
    font-size: 15px;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: left; */
    width: 100%;
    resize: none;
    border: none;
    outline: none;
    border-bottom-left-radius: 10px;
    box-sizing: border-box;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.33;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #565867;
    -webkit-font-smoothing: antialiased;
    max-height: 40px;
    bottom: 0;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;
    cursor: text;
}

.message-input:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  /* color: rgba(86, 88, 103, 0.3); */
  filter: contrast(15%);
  outline: none;
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