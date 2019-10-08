import Vue from 'vue'
import App from './App.vue'
import feather from 'vue-icon'
import store from './store'
Vue.config.productionTip = false
Vue.use(feather, 'v-icon')

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

export { default as Chat } from './components/Chat.vue';