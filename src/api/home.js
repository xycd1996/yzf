import axios from '@axios'

class HomeApi {
  async getBanner() {
    const res = await axios.post('/ts_shop/merch/banner')
    return Promise.resolve(res.data)
  }

  async getProduct() {
    const res = await axios.post('/ts_shop/material/index')
    return Promise.resolve(res.data)
  }
}

export default new HomeApi()
