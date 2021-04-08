import axios from '@axios'
import { transferFormData } from '@assets/js/help'

class GoodsApi {
  async getDetail(id) {
    const formData = new FormData()
    formData.append('id', id)
    const res = await axios.post('/ts_shop/material/detail', formData)
    return Promise.resolve(res.data)
  }

  async getAll({ keyword = '', page = 1, shop_id = '', sortType = 0, pagesize = 10 }) {
    const formData = transferFormData({ keyword, page, shop_id, sortType, pagesize })
    const res = await axios.post('/ts_shop/material/list', formData)
    return Promise.resolve(res.data)
  }
}

export default new GoodsApi()
