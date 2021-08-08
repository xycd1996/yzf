import Axios from '@kiter/axios'

export default {
  login: Axios.post('/ts_shop/check/login/account'),
  shopList: Axios.post('/tsShop/admin.checker/getShopList'),
  checkDetail: Axios.post('/tsShop/admin.checker/check_detail'),
  checkCode: Axios.post('/tsShop/admin.checker/check'),
  recordList: Axios.post('/tsShop/admin.checker/checke_list')
}
