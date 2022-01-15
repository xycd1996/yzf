import Axios from '@kiter/axios'

export default {
  /** 获取竞拍详情 */
  getBiddingDetail: Axios.post('/tsShop/goods.Auction/detail'),
  /** 竞拍记录 */
  getBiddingRecordList: Axios.post('/tsShop/goods.Auction/records'),
  /** 保证金订单 */
  createDeposit: Axios.post('/tsShop/goods.Auction/give_promise'),
  /** 出价 */
  createNewPrice: Axios.post('/tsShop/goods.Auction/give_price')
}
