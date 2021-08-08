import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '183701')
  localStorage.setItem('token', 'd6d003799fd28af9f2e2e39fdb2bd0fe')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
