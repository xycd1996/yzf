import Axios from '@kiter/axios'

export default {
  login: Axios.post('/ts_shop/check/login/account'),
  shopList: Axios.post('/tsShop/admin.checker/getShopList')
}
