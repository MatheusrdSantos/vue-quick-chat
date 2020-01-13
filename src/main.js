import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

export { default as Chat } from './components/Chat.vue';
