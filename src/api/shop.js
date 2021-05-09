import Axios from '@kiter/axios'

export default {
  get: Axios.post('/ts_shop/info/get'),
  getList: Axios.post('/ts_shop/merch/shoplist'),
  increasePoints: (url) => Axios.post(url),
  visitShop: Axios.post('/tsShop/addons.short_video/shopReward')
}
