import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '183701')
  localStorage.setItem('token', 'f82e9cee156c2a4514e5d26b927b0de8')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
