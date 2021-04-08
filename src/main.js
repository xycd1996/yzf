import '@assets/scss/layout.scss'
import FastClick from 'fastclick'
import { Lazyload } from 'vant'
import 'vant/lib/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VConsole from 'vconsole'

// new VConsole()

FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(Lazyload, {
  lazyComponent: true,
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
