import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '183701')
  localStorage.setItem('token', '061cffb292a302fadfcb396e3e3c1dea')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
