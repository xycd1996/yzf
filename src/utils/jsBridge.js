/**
 * @description 跳转APP登录页
 */
export const toLogin = () => {
  WebViewJavascriptBridge.callHandler('intent_class', {
    className: 'com.yishi.yszf.ui.login.LoginActivity'
  })
}

/**
 * 
 * @description 打开App认证页面
 */
export const toAuth = () => {
  WebViewJavascriptBridge.callHandler('intent_class', {
    className: 'com.yishi.yszf.ui.mine.activity.KycActivity'
  })
}

/**
 * @description 设置APP顶部状态栏是否显示
 * @param show Boolean
 */
export const setStatusBar = (show) => {
  WebViewJavascriptBridge.callHandler('set_topbar', {
    show
  })
}

/**
 * @description 设置APP顶部添加状态栏高度
 */

export const setStatusMarginTop = () => WebViewJavascriptBridge.callHandler('add_top_margin')

/**
 * @description 微信支付
 * @param jumpUrl String - 支付成功后跳转页面
 * @param wechatParams Object 微信支付参数
 */
export const onWechatPay = (jumpUrl, { appid, partnerid, prepayid, packageName, noncestr, timestamp, sign }) => {
  WebViewJavascriptBridge.callHandler('wechat_pay', {
    appId: appid,
    partnerId: partnerid,
    prepayId: prepayid,
    package: packageName,
    nonceStr: noncestr,
    timeStamp: timestamp,
    sign: sign,
    jumpUrl: jumpUrl
  })
}

/**
 * @description 调用APP扫码
 * @param format String
 * @param cb Function
 */
export const onScanCode = (format, cb) => {
  WebViewJavascriptBridge.callHandler(
    'scan_and_result',
    {
      format
    },
    (callback) => {
      cb(callback)
    }
  )
}

/**
 * @description 打开APP用户主页
 * @param authod_id number
 */

export const openUserHomePage = (authod_id) => {
  WebViewJavascriptBridge.callHandler('open_person_info', {
    authod_id
  })
}

/**
 * @description 打开APP专题页
 * @param topicId number
 */

export const openTopic = (topicId) => {
  WebViewJavascriptBridge.callHandler('open_theme', {
    topicid: topicId
  })
}

/**
 * @description 关闭APP当前webview页
 */

export const closeWeb = () => {
  WebViewJavascriptBridge.callHandler('close_webview')
}

/**
 * @description 获取APP当前定位
 * @returns pos { city: string, district: string, latitude: number, longitude: number, province: string }
 */

export const getLocation = (callback) => {
  WebViewJavascriptBridge.callHandler('get_location', {}, (pos) => {
    callback(pos)
  })
}

/**
 * @description 播放APP视频列表
 */

export const openVideoList = (router, position, currentPage, userid) => {
  const dispatchParams = JSON.stringify({
    userid
  })
  WebViewJavascriptBridge.callHandler('play_video', {
    router,
    position,
    currentPage,
    dispatchParams
  })
}
