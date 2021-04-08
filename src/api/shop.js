import axios from '@axios'
import { transferFormData } from '@/assets/js/help'

class ShopApi {
  async get(shop_id) {
    const formData = transferFormData({ shop_id })
    const res = await axios.post('/ts_shop/info/get', formData)
    return Promise.resolve(res.data)
  }
}

export default new ShopApi()
