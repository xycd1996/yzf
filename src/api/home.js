import Axios from '@kiter/axios'

export default {
  getBanner: Axios.post('/ts_shop/merch/banner'),
  getProduct: Axios.post('/ts_shop/material/index'),
  getMenus: Axios.post('/ts_shop/menus/v2/get')
}
