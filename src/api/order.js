import axios from '@axios'
import { transferFormData } from '@/assets/js/help'

class OrderApi {
  async get(order_status = 1, page = 1, pagesize = 10, product_type = 0) {
    const formData = transferFormData({ order_status, product_type, page, pagesize })
    const res = await axios.post('/ts_shop/order/merch/records', formData)
    return Promise.resolve(res.data)
  }

  async buy(id, num, specification_combine_id) {
    const formData = transferFormData({ id, num, specification_combine_id })
    const res = await axios.post('ts_shop/order/buy/material/check', formData)
    return Promise.resolve(res)
  }

  async singleDetail(id, num, specification_combine_id) {
    const formData = transferFormData({ id, num, specification_combine_id })
    const res = await axios.post('ts_shop/order/buy/material', formData)
    return Promise.resolve(res.data)
  }

  async multipleDetail(goods_cart_ids) {
    const formData = transferFormData({ goods_cart_ids })
    const res = await axios.post('ts_shop/cart/material/settle/detail', formData)
    return Promise.resolve(res.data)
  }
}

export default new OrderApi()
