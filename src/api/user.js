import axios from '@axios'

class UserApi {
  async address() {
    const res = await axios.post('ts_shop/user/get_default_addreess')
    return Promise.resolve(res.data)
  }
}

export default new UserApi()
