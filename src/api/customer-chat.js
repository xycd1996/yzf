import Axios from '@kiter/axios'

export default {
  send: Axios.post('/tsShop/addons.Kefu/request'),
  list: Axios.post('/tsShop/addons.Kefu/history')
}