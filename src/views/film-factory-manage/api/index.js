import retAxios from '@kiter/axios'

export default {
  // 获取会员列表
  getAccountList: retAxios.post('/tsShop/admin.Video/members'),
  // 获取会员详细信息
  getAccountDetail: retAxios.post('/tsShop/admin.Video/author'),
  // 移除制片厂用户
  removeAccount: retAxios.post('/tsShop/admin.video/removeUser'),
  // 获取视频列表
  getVideoList: retAxios.post('/tsShop/admin.Video/videos'),
  // 用户统计数据
  getUserStatics: retAxios.post('/tsShop/admin.Video/memberAnalyze'),
  // 获取制片厂排行
  getRankingList: retAxios.post('/tsShop/admin.Video/zpcRanking')
}
