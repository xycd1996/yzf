import axios from '@kiter/axios'

export default {
  // 请求学院头部专题分类
  getCategory: axios.post('/tsShop/addons.short_video_school/articleTopic'),
  // 学院列表z
  getCollege: axios.post('/tsShop/addons.short_video_school/articleLists'),
  // 学院banner
  getBanner: axios.post('/tsShop/addons.short_video_school/banner'),
  // 文章tab
  getTabs: axios.post('/tsShop/addons.short_video_school/articleCates'),
  // 文章列表
  getList: axios.post('/tsShop/addons.short_video_school/articleLists'),
}
