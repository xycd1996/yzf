import Axios from '@kiter/axios'

export default {
  get: Axios.post('/ts_shop/cart/material/my'),
  add: Axios.post('/ts_shop/cart/material/add'),
  update: Axios.post('/ts_shop/cart/material/update'),
  orderPay: Axios.post('/ts_shop/cart/material/settle') // 购物车多个支付
}
