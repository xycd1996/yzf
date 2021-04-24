import Axios from '@kiter/axios'

export default {
  get: Axios.post('/ts_shop/order/merch/records'),
  buy: Axios.post('/ts_shop/order/buy/material/check'),
  singleDetail: Axios.post('/ts_shop/order/buy/material'),
  multipleDetail: Axios.post('/ts_shop/cart/material/settle/detail'),
  detail: Axios.post('/ts_shop/order/merch/detail')
}
