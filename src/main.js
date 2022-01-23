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
  sessionStorage.setItem('uid', '1868779')
  sessionStorage.setItem('token', '1d7e93832d611c5ac16433aacc7d88ce')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
