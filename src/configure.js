import { configure, instance } from '@kiter/axios'
import FastClick from 'fastclick'
import { Lazyload, Notify, Toast } from 'vant'
import VConsole from 'vconsole'
import Vue from 'vue'

new VConsole()

configure({
  beforeRequest: (data) => {
    data['merch_id'] = 192
    data['uid'] = localStorage.getItem('uid')
    data['token'] = localStorage.getItem('token')
    data['debug'] = true
    data['bodyType'] = 'formData'
    if (!data['uid'] || !data['token']) {
      WebViewJavascriptBridge.callHandler('intent_class', {
        className: 'com.yishi.yszf.ui.login.LoginActivity'
      })
    }
  },
  onError: (err) => {
    Notify({
      type: 'danger',
      message: err.msg
    })
    Toast.clear()
  }
})

WebViewJavascriptBridge.callHandler('set_topbar', {
  show: false
})

instance.defaults.baseURL = 'http://58.42.4.33:20004'

FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(Lazyload, {
  lazyComponent: true
})
