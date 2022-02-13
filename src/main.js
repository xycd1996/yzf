import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

// new VConsole()

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '1868784')
  localStorage.setItem('token', 'f3a4d20dc24e67f2542468f338264096')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
