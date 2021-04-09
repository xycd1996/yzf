import Axios from '@kiter/axios'

export default {
  getDetail: Axios.post('/ts_shop/material/detail'),
  getAll: Axios.post('/ts_shop/material/list')
}
