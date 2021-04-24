<template>
  <div class="product-info">
    <van-panel
      class="panel"
      icon="shop"
      :title="title"
      @click="_onClickOrder()"
      :status="_normalizeStatus(orderStatus)"
    >
      <div class="container">
        <ul class="shop-order">
          <li v-for="item in orderList" :key="item.id" class="items">
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
            <div class="freight">运费：￥{{ expressPrice }}</div>
            <div class="total">
              <span class="num">共计{{ total }}件商品</span>
              <span>合计：￥{{ totalPrice }}</span>
              <span v-if="parseInt(totalIntegral)">
                <!-- +{{order.integral_total}}积分 -->
              </span>
            </div>
          </div>
          <div class="payment" v-if="!orderStatus">
            <van-button @click.stop="handleCancel()" text="取消" size="small" />
            <van-button
              @click.stop="handlePayment()"
              style="margin-left: 5px;"
              type="danger"
              text="付款"
              size="small"
            />
          </div>
          <div v-if="orderStatus === 1" class="send">
            <van-button text="提醒发货" size="small" />
          </div>
          <div v-if="orderStatus === 4" class="receiving">
            <van-button text="确认收货" type="danger" size="small" />
          </div>
        </div>
      </template>
    </van-panel>
  </div>
</template>

<script>
import { Button, Panel, Image, Loading, Dialog } from 'vant'
import { ORDER_STATUS } from '@assets/constants/order'

export default {
  props: {
    orderList: Array,
    title: String,
    orderStatus: Number,
    expressPrice: String,
    totalPrice: [String, Number],
    totalIntegral: String,
    productId: String,
    handleCancelOrder: Function,
    handlePayment: Function
  },
  components: {
    'van-panel': Panel,
    'van-button': Button,
    'van-image': Image,
    'van-loading': Loading
  },
  computed: {
    total() {
      return this.orderList?.length ?? 0
    }
  },
  methods: {
    handleCancel() {
      Dialog.confirm({
        title: '提示',
        message: '确认取消订单？'
      }).then(() => {
        this.handleCancelOrder()
      })
    },
    _onClickOrder() {
      this.$router.push({
        name: 'GoodsDetail',
        params: {
          id: this.productId
        }
      })
    },
    _normalizeStatus(status) {
      return ORDER_STATUS[status]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@assets/scss/theme.scss';

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
</style>
