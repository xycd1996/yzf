import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '183721')
  localStorage.setItem('token', '6f41226bdbf9fc94e3aa7bd3ee731bf3')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
