import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '183701')
  localStorage.setItem('token', 'ef469c6014bc592db0ede8976f572362')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
