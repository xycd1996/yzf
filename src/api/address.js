import Axios from '@kiter/axios'

export default {
  getList: Axios.post('/ts_shop/user/myaddresslist'),
  getDetail: Axios.post('/ts_shop/user/getadressinfo'),
  update: Axios.post('/ts_shop/user/upd_adress'),
  create: Axios.post('/ts_shop/user/addmyaddress'),
  delete: Axios.post('/ts_shop/user/del_adress')
}
