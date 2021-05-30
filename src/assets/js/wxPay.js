import { Toast } from "vant"

export default (data) => {
  Toast.clear()
  WebViewJavascriptBridge.callHandler('wechat_pay', {
    appId: data.appid,
    partnerId: data.partnerid,
    prepayId: data.prepayid,
    package: data.package,
    nonceStr: data.noncestr,
    timeStamp: data.timestamp,
    sign: data.sign,
    jumpUrl: 'http://58.42.4.33:20004/hz_yzf_web/#/order'
  })
}
