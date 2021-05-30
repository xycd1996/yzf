import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'


// import VConsole from 'vconsole'
// new VConsole()

localStorage.setItem('uid', '183701')
localStorage.setItem('token', 'e668d884676fab5ce0f99dd7b8a02526')

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
