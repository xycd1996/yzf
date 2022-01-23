import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '1868779')
  localStorage.setItem('token', '1d7e93832d611c5ac16433aacc7d88ce')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
