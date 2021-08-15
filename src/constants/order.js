export const ORDER_STATUS = (productType) => {
  if (productType === 1) {
    return ['待付款', '待使用', '交易完成', '退款成功', '已使用', '交易关闭', '交易超时']
  }
  return ['待付款', '待发货', '交易完成', '退款成功', '已发货', '交易关闭', '交易超时']
}

export const TICKET_ORDER_STATUS = ['代付款', '未核销', '已核销', '已过期']
