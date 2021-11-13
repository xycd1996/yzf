import { configure, instance } from '@kiter/axios'
import FastClick from 'fastclick'
import debounce from 'lodash/debounce'
import { Lazyload, Notify, Toast } from 'vant'
import VConsole from 'vconsole'
import Vue from 'vue'

new VConsole()

const debounceLogin = debounce(() => {
  WebViewJavascriptBridge.callHandler('intent_class', {
    className: 'com.yishi.yszf.ui.login.LoginActivity',
  })
}, 500)

configure({
  beforeRequest: (data) => {
    data['merch_id'] = 192
    data['uid'] = localStorage.getItem('uid')
    data['token'] = localStorage.getItem('token')
    data['debug'] = true
    data['bodyType'] = 'formData'
    if (!data['uid'] || !data['token']) {
      debounceLogin()
    }
  },
  onError: (err) => {
    Notify({
      type: 'danger',
      message: err.msg,
    })
    Toast.clear()
  },
})

process.env.NODE_ENV === 'production' &&
  WebViewJavascriptBridge.callHandler('set_topbar', {
    show: false,
  })

instance.defaults.baseURL = 'http://58.42.4.33:20004'

FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(Lazyload, {
  lazyComponent: true,
})
