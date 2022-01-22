import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '183701')
  localStorage.setItem('token', '0f4fff67e942e08312f2bc87d8be1955')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
