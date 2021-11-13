import { onWechatPay } from '@/utils/jsBridge'
import { Toast } from 'vant'

export default (data) => {
  Toast.clear()
  onWechatPay('http://58.42.4.33:20004/hz_yzf_web/#/order', {
    appId: data.appid,
    partnerId: data.partnerid,
    prepayId: data.prepayid,
    package: data.package,
    nonceStr: data.noncestr,
    timeStamp: data.timestamp,
    sign: data.sign,
  })
}
