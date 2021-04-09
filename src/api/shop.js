import Axios from '@kiter/axios'

// class ShopApi {
//   async get(shop_id) {
//     const formData = transferFormData({ shop_id })
//     const res = await axios.post('/ts_shop/info/get', formData)
//     return Promise.resolve(res.data)
//   }
// }

export default {
  get: Axios.post('/ts_shop/info/get')
}
