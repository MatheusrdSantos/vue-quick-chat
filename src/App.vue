<template>
  <div id="app">
    <div class="chat-container">
      <Chat :participants="participants" :myself="myself" :messages="messages"/>
    </div>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'

export default {
  name: 'app',
  components: {
    Chat
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
          timestamp: new Date('December 17, 2015 03:24:00')
        },
        {
          content: 'testing style for sent messages', 
          myself: true,
          participantId: 3,
          timestamp: new Date('December 17, 2010 03:24:00')
        },
        {
          content: 'testing style for received messages', 
          myself: false,
          participantId: 2,
          timestamp: new Date('December 17, 2011 03:24:00')
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
