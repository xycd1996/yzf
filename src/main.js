import '@assets/js/jsBride'
import '@assets/less/layout.less'
import Vue from 'vue'
import App from './App.vue'
import './configure'
import router from './router'
import store from './store'

// import VConsole from 'vconsole'
// new VConsole()

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('uid', '183701')
  localStorage.setItem('token', '193cfa6cfd61791b296fb26abd459922')
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
