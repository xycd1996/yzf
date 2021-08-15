<!-- Editor:xuyuchen -->
<template>
  <page-loading :loading="pageLoading">
    <div class="order">
      <van-popup closeable v-model="payMethodSelet" round position="bottom">
        <van-cell-group title="请选择支付方式">
          <van-cell @click="handleWechatPay()" title="微信支付" clickable is-link />
        </van-cell-group>
      </van-popup>
      <van-tabs v-model="tabsActive" @change="tabOnChange" sticky>
        <van-tab v-for="tab in tabs" :key="tab.value" :name="tab.value" :title="tab.title">
          <van-list
            class="list"
            v-if="orderList.length"
            finished-text="没有更多了"
            :finished="finished"
            v-model="loading"
            :immediate-check="false"
            @load="onLoad"
          >
            <van-panel
              class="panel"
              icon="shop"
              v-for="order in orderList"
              :key="order.order_id"
              :title="order.title"
              @click="onClickOrder(order.order_id)"
              :status="normalizeStatus(order.product_type, order.status)"
            >
              <div class="container">
                <ul class="shop-order">
                  <li v-for="item in order.lists" :key="item.id" class="items">
                    <div class="img">
                      <van-image
                        height="8rem"
                        width="100%"
                        fit="cover"
                        lazy-load
                        :src="item.product_photo"
                      >
                        <template v-slot:loading>
                          <van-loading type="spinner" vertical size="20">加载中...</van-loading>
                        </template>
                        <template v-slot:error>加载失败</template>
                      </van-image>
                    </div>
                    <div class="info">
                      <div class="header">
                        <span class="title van-multi-ellipsis--l2">{{ item.product_title }}</span>
                        <span class="price price-unit">{{ item.product_price }}</span>
                      </div>
                      <div class="footer">
                        <span class="sku">{{ item.product_specification_combine_value }}</span>
                        <span class="num">×{{ item.product_num }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <template #footer>
                <div class="footer">
                  <div class="price">
                    <div class="freight">运费：￥{{ order.express_price_total }}</div>
                    <div class="total">
                      <span class="num">共计{{ order.lists.length }}件商品</span>
                      <span>合计：￥{{ order.order_price }}</span>
                      <span v-if="parseInt(order.integral_total)">
                        <!-- +{{order.integral_total}}积分 -->
                      </span>
                    </div>
                  </div>
                  <div class="payment" v-if="!order.status">
                    <van-button
                      @click.stop="handleCancel(order.order_id)"
                      text="取消"
                      size="small"
                    />
                    <van-button
                      @click.stop="
                        handlePayment(order.pay_type, order.integral_total, order.order_id)
                      "
                      style="margin-left: 5px;"
                      type="danger"
                      text="付款"
                      size="small"
                    />
                  </div>
                  <template v-if="productTypeName(order.product_type) !== '票务'">
                    <div v-if="order.status === 1" class="send">
                      <van-button text="提醒发货" size="small" />
                    </div>
                    <div v-if="order.status === 4" class="receiving">
                      <van-button text="确认收货" type="danger" size="small" />
                    </div>
                  </template>
                </div>
              </template>
            </van-panel>
          </van-list>
          <van-empty v-show="!orderList.length" description="您还没有相关的订单" />
        </van-tab>
      </van-tabs>
    </div>
  </page-loading>
</template>

<script>
import {
  Tabs,
  Tab,
  List,
  Empty,
  Panel,
  Image,
  Loading,
  Button,
  Popup,
  Dialog,
  CellGroup,
  Cell,
  Toast
} from 'vant'
import OrderApi from '@api/order'
import { GOODS_TYPE, ORDER_STATUS } from '@constants'
import { TABS } from './constants'
import PageLoading from '@components/page-loading/page-loading'
import wxPay from '@assets/js/wxPay'

const PAGE_SIZE = 10

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-list': List,
    'van-empty': Empty,
    'van-panel': Panel,
    'van-image': Image,
    'van-loading': Loading,
    'van-button': Button,
    'van-popup': Popup,
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'page-loading': PageLoading
  },
  data() {
    return {
      finished: false,
      loading: false,
      tabsActive: 1,
      orderList: [],
      page: 1,
      pageLoading: true,
      payMethodSelet: false,
      readyPayOrederId: ''
    }
  },
  computed: {
    tabs() {
      return TABS
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    productTypeName(type) {
      return GOODS_TYPE[type]?.name
    },
    async handleWechatPay() {
      if (!this.readyPayOrederId) {
        return
      }
      Toast.loading({
        mask: true,
        duration: 0,
        message: '正在支付...'
      })
      const { data } = await OrderApi.pendingOrderPay({
        order_id: this.readyPayOrederId,
        pay_type: 'money',
        pay_channel: 'wx'
      })
      wxPay(data)
    },
    handlePayment(type, integral, id) {
      if (type === 'money') {
        this.payMethodSelet = true
        this.readyPayOrederId = id
        return
      }
      Dialog.confirm({
        title: '积分支付确认',
        message: `确认是否支付${integral}积分？`
      }).then(() => {
        console.log('确认支付')
      })
    },
    handleCancel(orderId) {
      Dialog.confirm({
        title: '提示',
        message: '确认取消订单？'
      }).then(() => {
        this.cancelOrder(orderId)
      })
    },
    normalizeStatus(type, status) {
      return ORDER_STATUS(type)[status]
    },
    onClickOrder(id) {
      this.$router.push({
        name: 'OrderDetail',
        params: {
          id
        }
      })
    },
    onLoad() {
      this.page++
      this.queryOrder()
    },
    tabOnChange() {
      this.page = 1
      this.orderList = []
      this.finished = false
      this.queryOrder()
    },
    async init() {
      this.page = 1
      this.finished = false
      this.loading = true
      this.orderList = []
      await this.queryOrder()
      this.pageLoading = false
    },
    async queryOrder() {
      const { data } = await OrderApi.get({
        order_status: this.tabsActive,
        page: this.page,
        pageSize: PAGE_SIZE,
        product_type: 0
      })
      this.orderList.push(...data)
      this.loading = false
      if (!data.length || data.length < PAGE_SIZE) {
        this.finished = true
      }
    },
    async cancelOrder(orderId) {
      await OrderApi.cancelOrder({
        order_id: orderId
      })
      Toast.success('取消成功')
      this.init()
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@assets/less/theme.less';

.order {
  .list {
    .panel {
      margin: 1rem;
      border-radius: 10px;
      overflow: hidden;
      .container {
        .shop-order {
          .items {
            padding: 1rem;
            display: flex;
            .img {
              flex: 0 0 8rem;
              border-radius: 4px;
              overflow: hidden;
            }
            .info {
              margin-left: 1rem;
              flex: 1 1 auto;
              .header {
                display: flex;
                justify-content: space-between;
                .title {
                  flex: 1 1 auto;
                  font-size: @medium-font-size;
                  font-weight: 500;
                  color: @title-color;
                }
                .price {
                  flex: 0 0 4rem;
                  font-size: @medium-font-size;
                  text-align: right;
                }
              }
              .footer {
                display: flex;
                justify-content: space-between;
                .sku {
                  font-size: @small-font-size;
                  color: @desc-color;
                }
                .num {
                  font-size: @small-font-size;
                  color: @desc-color;
                }
              }
            }
          }
        }
      }
      .footer {
        font-size: @medium-font-size;
        text-align: right;
        .price {
          margin-bottom: 0.6rem;
          .freight {
            font-size: @medium-font-size;
            color: @desc-color;
          }
          .total {
            margin: 0.4rem 0;
            font-size: @medium-font-size;
            .num {
              margin-right: 0.6rem;
              font-size: @less-font-size;
              color: @desc-color;
            }
          }
        }
      }
    }
  }
}
</style>
