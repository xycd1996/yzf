import axios from '@kiter/axios'

export default {
  getTopicDetail: axios.post('/tsShop/addons.short_video_school/articleTopicDetail'),
  // 专题内分类
  getTopicCate: axios.post('/tsShop/addons.short_video_school/articleTopic')
}
