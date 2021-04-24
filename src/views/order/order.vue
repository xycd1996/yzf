<!-- Editor:xuyuchen -->
<template>
  <div class="order">
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
            @click="_onClickOrder(order.order_id)"
            :status="_normalizeStatus(order.status)"
          >
            <div class="container">
              <ul class="shop-order">
                <li v-for="item in order.lists" :key="item.id" class="items">
                  <div class="img">
                    <van-image height="8rem" width="100%" fit="cover" lazy-load :src="item.product_photo">
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
                  <van-button text="取消" size="small" />
                  <van-button style="margin-left: 5px;" type="danger" text="付款" size="small" />
                </div>
                <div v-if="order.status === 1" class="send">
                  <van-button text="提醒发货" size="small" />
                </div>
                <div v-if="order.status === 4" class="receiving">
                  <van-button text="确认收货" type="danger" size="small" />
                </div>
              </div>
            </template>
          </van-panel>
        </van-list>
        <van-empty v-show="!orderList.length" description="您还没有相关的订单" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab, List, Empty, Panel, Image, Loading, Button } from 'vant'
import OrderApi from '@api/order'

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
    'van-button': Button
  },
  data() {
    return {
      finished: false,
      loading: false,
      tabsActive: 1,
      tabs: [
        {
          value: 1,
          title: '全部'
        },
        {
          value: 2,
          title: '代付款'
        },
        {
          value: 3,
          title: '待发货'
        },
        {
          value: 4,
          title: '待收货'
        },
        {
          value: 6,
          title: '已收货'
        },
        {
          value: 5,
          title: '退款/售后'
        }
      ],
      orderList: [],
      page: 1
    }
  },
  mounted() {
    this._queryOrder()
  },
  methods: {
    _normalizeStatus(status) {
      const arr = ['待付款', '待发货', '交易完成', '退款成功', '已发货', '交易关闭', '交易超时']
      return arr[status]
    },
    _onClickOrder(id) {
      console.log('id: ', id)
      this.$router.push({
        name: 'OrderDetail',
        params: {
          id
        }
      })
    },
    async _queryOrder() {
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
    onLoad() {
      this.page++
      this._queryOrder()
    },
    tabOnChange() {
      this.page = 1
      this.orderList = []
      this.finished = false
      this._queryOrder()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@assets/scss/theme.scss';

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
                  font-size: $medium-font-size;
                  font-weight: 500;
                  color: $title-color;
                }
                .price {
                  flex: 0 0 4rem;
                  font-size: $medium-font-size;
                  text-align: right;
                }
              }
              .footer {
                display: flex;
                justify-content: space-between;
                .sku {
                  font-size: $small-font-size;
                  color: $desc-color;
                }
                .num {
                  font-size: $small-font-size;
                  color: $desc-color;
                }
              }
            }
          }
        }
      }
      .footer {
        font-size: $medium-font-size;
        text-align: right;
        .price {
          margin-bottom: 0.6rem;
          .freight {
            font-size: $medium-font-size;
            color: $desc-color;
          }
          .total {
            margin: 0.4rem 0;
            font-size: $medium-font-size;
            .num {
              margin-right: 0.6rem;
              font-size: $less-font-size;
              color: $desc-color;
            }
          }
        }
      }
    }
  }
}
</style>
