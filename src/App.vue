<template>
  <div id="app">
    <div class="chat-container">
      <Chat 
      :participants="participants"
      :myself="myself"
      :messages="messages"
      :onType="onType"
      :onMessageSubmit="onMessageSubmit"
      :chatTitle="chatTitle"
      :placeholder="placeholder"
      :colors="colors"
      :borderStyle="borderStyle"
      :hideCloseButton="hideCloseButton"
      :closeButtonIconSize="closeButtonIconSize"
      :submitIconSize="submitIconSize"/>
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
    moment.locale('pt-br')
  },
  data(){
    return {
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
          timestamp: { year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123 }
        },
        {
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
        }
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
      closeButtonIconSize: "20px"
    }
  },
  methods: {
    onType: function (e){
      console.log('typing');
    },
    onMessageSubmit: function(message){
      console.log(message)
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
.chat-container{
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(247, 243, 243);
  padding: 10px 0 10px 0;
  height: 500px;
  width: 350px;
}
</style>
