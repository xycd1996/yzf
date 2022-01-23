import '@assets/js/jsBride'
import '@assets/less/layout.less'
import VConsole from 'vconsole'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

new VConsole()

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '1868787')
  localStorage.setItem('token', '5555746878ce6760b31ac441ba540ce5')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
