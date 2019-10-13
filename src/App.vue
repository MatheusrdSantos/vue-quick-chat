<template>
  <div id="app">
    <div class="content">

      <div class="chat-container">
        <Chat v-if="visible"
        :participants="participants"
        :myself="myself"
        :messages="messages"
        :onType="onType"
        :onMessageSubmit="onMessageSubmit"
        :chatTitle="chatTitle"
        :placeholder="placeholder"
        :colors="colors"
        :borderStyle="borderStyle"
        :onClose="onClose"
        :hideCloseButton="hideCloseButton"
        :closeButtonIconSize="closeButtonIconSize"
        :submitIconSize="submitIconSize"
        :asyncMode="asyncMode">
        <template v-slot:header>
          <div class="header-slot">
            <a v-for="(participant, index) in participants" :key="index" class="custom-title">{{`${participant.name}, `}}</a>
          </div>
        </template>
        </Chat>
      </div>
      <div class="external-controller">
        <div class="controller-btn-container">
          <button class="btn-message" @click="addMessage">Adicionar mensagem</button>
          <button class="btn-participant" @click="addParticipant">Adicionar participante</button>
        </div>
        <div class="message-list">
          <ol>
            <li v-for="(message, index) in messages" :key="index">
              {{message.content}}  
            </li>  
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'
import moment from 'moment'
export default {
  name: 'app',
  components: {
    Chat
  },
  created(){
    //moment.locale('pt-br')
  },
  data(){
    return {
      visible: true,
      participants: [
        {
          name: 'Arnaldo',
          id: 1
        },
        {
          name: 'Adam',
          id: 2
        }
      ],
      myself: {
        name: 'John Doe',
        id: 3
      },
      messages: [
        {
          content: "Really?! I don't care! Haha", 
          myself: false,
          participantId: 1,
          timestamp: { year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123 },
          uploaded: true,
          viewed: true
        },
        /* {
          content: "Hey, Adam! I'm feeling really fine this evening.", 
          myself: true,
          participantId: 3,
          timestamp: { year: 2011, month: 0, day: 5, hour: 19, minute: 10, second: 3, millisecond:123 }
        },
        {
          content: 'Hey, John Doe! How are you today?', 
          myself: false,
          participantId: 2,
          timestamp: { year: 2010, month: 3, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123 }
        } */
      ],
      chatTitle: 'My chat title',
      placeholder: 'send your message',
      colors:{
        header:{
          bg: '#d30303',
          text: '#fff'
        },
        message:{
          myself: {
            bg: '#fff',
            text: '#bdb8b8'
          },
          others: {
            bg: '#fb4141',
            text: '#fff'
          },
          messagesDisplay: {
            //bg: 'rgb(247, 243, 243)',
            //bg: '#f7f3f3'
            bg: '#f7f3f3'
          }
        },
        submitIcon: '#b91010'
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      hideCloseButton: false,
      submitIconSize: "20px",
      closeButtonIconSize: "20px",
      asyncMode: true
    }
  },
  methods: {
    // eslint-disable-next-line 
    onType: function (e){
      // eslint-disable-next-line 
      console.log('typing');
    },
    onMessageSubmit(message){
      /*
      * example simulating an upload callback. 
      * It's important to notice that even when your message wasn't send 
      * yet to the server you have to add the message into the array
      */
      this.messages.push(message);
      
      /*
      * you can update message state after the server response
      */
     // timeout simulating the request
      setTimeout(() => {
        message.uploaded = true
      }, 2000)
    },
    onClose() {
      this.visible = false;
    },
    addMessage(){
      this.messages.push(
        {
          content: "Update state", 
          myself: false,
          participantId: 1,
          timestamp: { year: 2014, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123 },
          uploaded: true,
          viewed: true
        }
      )
    },
    addParticipant(){
      let participant = {
        name: 'Karl', 
        id: 4
      }
      this.participants.push(participant)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content{
  width: 100%;
  display: flex;
  align-items:  center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.chat-container{
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(247, 243, 243);
  padding: 10px 0 10px 0;
  height: 500px;
  width: 350px;
}
.external-controller{
  background: #2c3e50;
  height: 300px;
  width: 600px;
  display: flex;
  color: #eee;
}

.controller-btn-container{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  flex-wrap: wrap;
}
.btn-message{
  cursor: pointer;
  background: #eee;
  border: none;
  height: 40px;
  color: #2c3e50;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
}
.btn-participant{
  cursor: pointer;
  background: #eee;
  border: none;
  height: 40px;
  color: #2c3e50;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
}
.btn-message:hover{
  background: rgb(255, 255, 255);
}
.custom-title{
  color: #eee;
}
.header-slot{
  max-height: 100%;
}
</style>
