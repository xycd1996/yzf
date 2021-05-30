import Axios from '@kiter/axios'

export default {
  get: Axios.post('/ts_shop/order/merch/records'),
  buy: Axios.post('/ts_shop/order/buy/material/check'),
  singleDetail: Axios.post('/ts_shop/order/buy/material'),
  multipleDetail: Axios.post('/ts_shop/cart/material/settle/detail'),
  detail: Axios.post('/ts_shop/order/merch/detail'),
  cancelOrder: Axios.post('/ts_shop/order/cancel/ticket'),
  orderPay: Axios.post('/ts_shop/order/settle/material'), // 生成订单直接支付
  pendingOrderPay: Axios.post('/ts_shop/order/merch/pay') // 未支付订单支付
}
