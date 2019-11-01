import Vue from 'vue'
import App from './App.vue'
import feather from 'vue-icon'
Vue.config.productionTip = false
Vue.use(feather, 'v-icon')

new Vue({
  render: h => h(App)
}).$mount('#app')

export { default as Chat } from './components/Chat.vue';
