<template>
    <div class="container-message-manager">
        <div class="message-text-box">
            <div class="message-input" name="" id="" :placeholder="placeholder" tabIndex="0" contenteditable="true" ref="userInput" @input="handleType"></div>
        </div>
        <div class="container-send-message" @click.prevent="sendMessage">
            <v-icon name="send" base-class="icon-send-message" :style="{color: colors.submitIcon, width: submitIconSize}"></v-icon>
        </div>
    </div>    
</template>
<script>
import { mapMutations } from 'vuex'
import moment from 'moment'
export default {
    props:{
        onType:{
            type: Function,
            required: false,
            default: () => false
        },
        onMessageSubmit: {
            type: Function,
            required: false,
            default: () => false
        },
        colors: {
            type: Object,
            required: true
        },
        borderStyle: {
            type: Object,
            required: false,
            default: () =>{
                return {
                    topLeft: "10px",
                    topRight: "10px",
                    bottomLeft: "10px",
                    bottomRight: "10px",
                }
            }
        },
        submitIconSize: {
            type: String,
            required: false,
            default: "15px"
        },
    },
    data(){
        return {
            textInput: ''
        }
    },
    created(){
        moment.locale('pt-br')
    },
    computed: {
        myself: function (){
            return this.$store.state.myself;
        },
        placeholder: function(){
            return this.$store.state.placeholder;
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
                let message = {
                    content: this.textInput, 
                    myself: true, 
                    participantId: this.myself.id,
                    timestamp: moment()
                }
                this.onMessageSubmit(message)
                this.newMessage(message)
            }
        },
        handleType: function(e){
            this.onType(e);
            console.log(e)
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
    display: inline-block;
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
    /* color:#b91010; */
    width: 20px;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.3s;
    border-radius: 11px;
    padding: 8px;
}
.icon-send-message:hover{
    opacity: 1;
    background: #eee;
}
</style>