import '@assets/scss/layout.scss'
import { configure, instance } from '@kiter/axios'
import FastClick from 'fastclick'
import { Lazyload, Notify } from 'vant'
import 'vant/lib/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import VConsole from 'vconsole'

// new VConsole()

localStorage.setItem('uid', '183701')
localStorage.setItem('token', '244557dfcdc0f9059c531f48906bd33c')

configure({
  beforeRequest: (data) => {
    data['merch_id'] = 192
    data['uid'] = localStorage.getItem('uid')
    data['token'] = localStorage.getItem('token')
    data['bodyType'] = 'formData'
  },
  onError: (err) => {
    Notify({
      type: 'danger',
      message: err.msg
    })
  }
})

instance.defaults.baseURL = 'http://58.42.4.33:20004'

FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(Lazyload, {
  lazyComponent: true
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
