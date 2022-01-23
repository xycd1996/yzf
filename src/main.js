import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

// new VConsole()

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '1868779')
  localStorage.setItem('token', '1e03a8f684a4a51680cfaf9750e3f03f')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
