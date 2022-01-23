import Axios from '@kiter/axios'
export default {
  // 获取制片厂列表
  getList: Axios.post('/tsShop/addons.short_video/getZpcList'),
  // 加入制片厂
  joinFactory: Axios.post('/tsShop/addons.Short_Video/join')
}
