import Axios from 'axios'
import { Notify } from 'vant'
import { defaultParams } from './help'

const axios = Axios.create({
  baseURL: 'http://58.42.4.33:20004',
  // 10秒请求超时
  timeout: 10000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false,

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json',

  responseEncoding: 'utf8',

  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function(status) {
    return status >= 200 && status < 300
  },
})

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    defaultParams(config)
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    if (res.data.code != 200) {
      Notify({ message: res.data.msg, type: 'danger' })
      return Promise.reject(res.data.msg)
    }
    return res
  },
  (error) => {
    let errorMsg
    if (error && error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          errorMsg = error.response.data.msg
          break
        case 401:
          errorMsg = '请求要求用户的身份认证'
          break
        case 402:
          errorMsg = '保留将来使用'
          break
        case 403:
          errorMsg = '请求被服务端拒绝'
          break
        case 404:
          errorMsg = '请求资源无法找到'
          break
        case 405:
          errorMsg = '请求方法被禁止'
          break
        case 406:
          errorMsg = '服务端无法根据客户端请求的内容特性完成请求'
          break
        case 407:
          errorMsg = '应当使用代理进行授权'
          break
        case 408:
          errorMsg = '请求时间过长'
          break
        case 500:
          errorMsg = '服务端内部错误'
          break
        case 501:
          errorMsg = '服务端不支持请求的功能'
          break
        case 502:
          errorMsg = '无效的响应'
          break
        case 503:
          errorMsg = '超载或系统维护无法处理请求'
          break
        case 505:
          errorMsg = '服务器不支持请求的HTTP协议的版本'
          break
        default:
          break
      }
    } else {
      errorMsg = '连接服务器失败'
    }
    Notify({ message: errorMsg, type: 'danger' })
    return Promise.reject(error)
  }
)

export default {
  post(url, data = {}) {
    return axios({
      method: 'POST',
      url,
      data,
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  },
}
