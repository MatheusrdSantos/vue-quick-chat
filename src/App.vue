<template>
  <div id="app">
    <div class="chat-container">
      <Chat :participants="participants" :myself="myself" :messages="messages"/>
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
          name: 'José',
          id: 2
        }
      ],
      myself: {
        name: 'Matheus S.',
        id: 3
      },
      messages: [
        {
          content: 'testing style for received messages', 
          myself: false,
          participantId: 1,
          timestamp: moment()
        },
        {
          content: 'testing style for sent messages', 
          myself: true,
          participantId: 3,
          timestamp: moment()
        },
        {
          content: 'testing style for received messages', 
          myself: false,
          participantId: 2,
          timestamp: moment()
        }
      ]
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
}
</style>
