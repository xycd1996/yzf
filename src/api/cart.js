import axios from '@axios'
import { transferFormData } from '@/assets/js/help'

class CartApi {
  async get() {
    const res = await axios.post('/ts_shop/cart/material/my')
    return Promise.resolve(res.data)
  }

  async add(goodsId, goodsNum, skuId) {
    const formData = transferFormData({ id: goodsId, num: goodsNum, specification_combine_id: skuId })
    const res = await axios.post('ts_shop/cart/material/add', formData)
    return Promise.resolve(res)
  }

  async update(id, num) {
    const formData = transferFormData({ id, num })
    const res = await axios.post('/ts_shop/cart/material/update', formData)
    return Promise.resolve(res)
  }

  async settlement() {}
}

export default new CartApi()
