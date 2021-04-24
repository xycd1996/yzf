import Axios from '@kiter/axios'

export default {
  get: Axios.post('/ts_shop/info/get'),
  getList: Axios.post('/ts_shop/merch/shoplist')
}
