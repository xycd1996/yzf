import Axios from '@kiter/axios'

export default {
  getBanner: Axios.post('/ts_shop/merch/banner'),
  getProduct: Axios.post('/tsShop/goods.material_v2/index'),
  getMenus: Axios.post('/ts_shop/menus/v2/get')
}
