import axios from '@axios'

class AddressApi {
  async get() {
    const res = await axios.post('/ts_shop/user/myaddresslist')
    return Promise.resolve(res.data)
  }
}

export default new AddressApi()
