<template>
  <div id="app">
    <div class="chat-container">
      <Chat/>
    </div>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'

export default {
  name: 'app',
  components: {
    Chat
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
