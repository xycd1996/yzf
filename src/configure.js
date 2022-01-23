import { configure, instance } from '@kiter/axios'
import FastClick from 'fastclick'
import debounce from 'lodash/debounce'
import { Lazyload, Notify, Toast } from 'vant'
import Vue from 'vue'
import { setStatusBar, setStatusMarginTop, toLogin } from './utils/jsBridge'

// new VConsole()

const debounceLogin = debounce(() => {
  toLogin()
}, 500)

configure({
  beforeRequest: (data) => {
    data['merch_id'] = 192
    data['uid'] = sessionStorage.getItem('uid')
    data['token'] = sessionStorage.getItem('token')
    data['bodyType'] = 'formData'
    if (!data['uid'] || !data['token']) {
      debounceLogin()
    }
  },
  onError: (err) => {
    Notify({
      type: 'danger',
      message: err.msg
    })
    Toast.clear()
    if (err.code == 405) {
      debounceLogin()
    }
  }
})

if (process.env.NODE_ENV === 'production') {
  setStatusBar(false)
  setStatusMarginTop()
}

instance.defaults.baseURL = 'http://58.42.4.33:20004'

FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(Lazyload, {
  lazyComponent: true
})
