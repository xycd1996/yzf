import axios from '@kiter/axios'

export default {
  // 请求学院头部分类
  getCategory: axios.post('/tsShop/addons.short_video_school/articleCates'),
  // 学院列表z
  getCollege: axios.post('/tsShop/addons.short_video_school/articleLists'),
}
