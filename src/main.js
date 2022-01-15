import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '183701')
  localStorage.setItem('token', '72483dedff4e9ab9e9f3f751c66a87b5')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
