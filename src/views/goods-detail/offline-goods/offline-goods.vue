<!-- 票务商城 -->
<template>
  <div class="offline-goods">
    <van-loading v-if="!Object.keys(goodsDetail).length" class="loading" color="#fe0200" />
    <div v-if="Object.keys(goodsDetail).length" class="container">
      <div class="swipe">
        <van-swipe indicator-color="white" @change="swipeChange">
          <van-swipe-item v-for="(img, index) in goodsDetail.swipers" :key="index">
            <van-image width="100%" height="34rem" fit="cover" :src="goodsDetail.img_prefix + img">
              <template v-slot:loading>
                <van-loading type="spinner" vertical size="20">加载中...</van-loading>
              </template>
              <template v-slot:error>加载失败</template>
            </van-image>
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/{{ swipersLength }}</div>
          </template>
        </van-swipe>
        <div @click="onClickBack" class="back">
          <van-icon color="#fff" name="arrow-left" size="1.6rem" />
        </div>
      </div>
      <div class="price">
        <div class="integral">
          积分:
          <span>{{ goodsDetail.integralPrice }}</span>
        </div>
        <div class="money">
          <span class="price-unit">{{ goodsDetail.price }}</span>
        </div>
      </div>
      <div class="info">
        <div class="text">
          <div class="title van-multi-ellipsis--l2">{{ goodsDetail.title }}</div>
          <div class="desc van-multi-ellipsis--l2">{{ goodsDetail.sub_title }}</div>
        </div>
        <div @click="handleCollect" class="collect">
          <van-icon :name="collect ? 'star' : 'star-o'" size="2rem" :color="collect ? 'gold' : 'black'" />
          <span>好物收藏</span>
        </div>
      </div>
      <div class="specs">
        <van-cell-group>
          <van-cell>
            <template #title>
              <div class="express">
                <span>不可退款</span>
              </div>
            </template>
            <template #default>
              <span class="sales">销量:{{ goodsDetail.sales_num }}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="merchant">
        <div class="avatar">
          <img :src="require('@assets/img/avatar_error.png')" />
        </div>
        <div class="merchant-info">
          <div class="name">{{ goodsDetail.shop_name }}</div>
          <ul class="tags">
            <li class="item">
              <span><van-icon name="passed" color="red" size="1rem"/></span>
              <span>企业认证</span>
            </li>
            <li class="item">
              <span><van-icon name="passed" color="red" size="1rem"/></span>
              <span>店铺保障</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="title">
        <van-divider :hairline="false">货品详情</van-divider>
      </div>
      <div class="detail">
        <div v-if="goodsDetail.ticket_detail" class="content" v-html="goodsDetail.ticket_detail"></div>
        <van-empty v-if="!goodsDetail.ticket_detail" class="none" description="暂无商品详情" />
      </div>
      <div class="bottom-action">
        <van-goods-action>
          <van-goods-action-icon color="#fe0200" icon="shop-o" @click="handleGoShop" text="店铺" />
          <van-goods-action-icon @click="onCustomerChat" icon="chat-o" text="客服" />
          <van-goods-action-button @click="buyModalVisible = true" type="danger" text="立即购买" />
        </van-goods-action>
      </div>
      <van-dialog
        v-model="buyModalVisible"
        title="订单确认"
        show-cancel-button
        confirm-button-text="确认下单"
        @confirm="handleBuy"
        @open="buyCount = 1"
      >
        <div class="buy-dialog">
          <div class="title">{{ goodsDetail.title }}</div>
          <div class="desc">{{ goodsDetail.sub_title }}</div>
          <div class="count">购买数量：<van-stepper v-model="buyCount" /></div>
          <div class="price-total">
            <span>实付金额：</span>
            <div class="price-unit">{{ goodsDetail.price * buyCount }}</div>
          </div>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import {
  Image,
  Swipe,
  SwipeItem,
  Loading,
  Cell,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Empty,
  Notify,
  Divider,
  Icon,
  CellGroup,
  Dialog,
  Stepper,
  Toast
} from 'vant'
import GoodsApi from '@api/goods'
import OrderApi from '@api/order'

export default {
  components: {
    'van-image': Image,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-loading': Loading,
    'van-cell': Cell,
    'van-goods-action': GoodsAction,
    'van-goods-action-icon': GoodsActionIcon,
    'van-goods-action-button': GoodsActionButton,
    'van-empty': Empty,
    'van-divider': Divider,
    'van-icon': Icon,
    'van-cell-group': CellGroup,
    'van-dialog': Dialog.Component,
    'van-stepper': Stepper
  },
  data() {
    return {
      goodsDetail: {},
      current: 0,
      swipersLength: 0,
      collect: false,
      buyModalVisible: false,
      buyCount: 1
    }
  },
  methods: {
    _initialization() {
      this._queryGoodsDetail()
    },
    async _queryGoodsDetail() {
      const id = this.$route.params.id
      const { data } = await GoodsApi.getOfflineGoods({ id })
      this.goodsDetail = data
      this.swipersLength = data.swipers?.length
    },
    onCustomerChat() {
      this.$router.push({
        name: 'CustomerChat',
        params: {
          id: this.goodsDetail?.shop_id
        },
        query: {
          shopName: this.goodsDetail?.shop_name ?? '未知店铺',
          goodsId: this.$route.params.id
        }
      })
    },
    async handleCollect() {
      const goodsId = this.$route.params.id
      GoodsApi.collectGoods({ goods_id: goodsId })
      this.collect = !this.collect
    },
    onClickBack() {
      this.$router.back()
    },
    swipeChange(index) {
      this.current = index
    },
    handleGoShop() {
      if (!this.goodsDetail.shop_id) {
        Notify({ message: '店铺不存在，请联系客服处理', type: 'warning' })
        return
      }
      this.$router.push({ path: `/shop/${this.goodsDetail.shop_id}` })
    },
    async handleBuy() {
      Toast.loading({
        message: '正在付款中...',
        forbidClick: true
      })
      const { data } = await OrderApi.createTicketOrder({
        id: this.goodsDetail.id,
        num: this.buyCount,
        coupon_id: 0,
        referee_id: 0,
        appoint_type: 3,
        order_from: 2,
        if_appoint: 0
      })
      const orderId = data.order_id
      // 为什么要定时器？因为后端两次接口要求时间差不能低于3s
      setTimeout(async () => {
        await OrderApi.payTicketOrder({
          order_id: orderId,
          pay_type: 'integral'
        })
        Toast.success({
          message: '支付成功',
          onClose: () =>
            this.$router.push({
              name: 'OrderDetail',
              params: {
                id: orderId
              }
            })
        })
      }, 3000)
    }
  },
  mounted() {
    this._initialization()
  }
}
</script>
<style lang="less" scoped>
@import '~@assets/less/theme';

.offline-goods {
  position: relative;
  z-index: 99;
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 99;
    background-color: #fff;
  }
  .container {
    .swipe {
      position: relative;
      background-color: #fff;
      .back {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 1rem;
        left: 1rem;
        width: 3.2rem;
        height: 3.2rem;
        background: #000;
        opacity: 0.5;
        border-radius: 50%;
      }
      .custom-indicator {
        position: absolute;
        right: 10px;
        bottom: 10px;
        padding: 4px 8px;
        font-size: @small-font-size;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
      }
    }
    .price {
      padding: 0 1.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      background: crimson;
      color: #fff;
      .integral {
        font-size: @large-font-size;
      }
      .money {
        font-size: @large-font-size;
        .price-unit {
          color: #fff;
        }
      }
    }
    .info {
      display: flex;
      padding: 0.8rem 1.6rem;
      background-color: #fff;
      .text {
        flex: 1 1 auto;
        .title {
          font-weight: 600;
          font-size: @large-font-size;
          color: @title-color;
        }
        .desc {
          line-height: 1.6;
          font-size: @less-font-size;
          color: @desc-color;
        }
      }
      .collect {
        flex: 0 0 4.8rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: @title-color;
        span {
          margin-top: 0.3rem;
        }
      }
    }
    .specs {
      margin: 10px 0;
      .express {
        display: flex;
        .line {
          margin: 0 1rem;
          width: 1px;
          background: #ddd;
        }
      }
    }
    .merchant {
      padding: 1rem 1.6rem;
      display: flex;
      align-items: center;
      background: #fff;
      .avatar {
        width: 4.2rem;
        height: 4.2rem;
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid #ccc;
        img {
          width: 4.2rem;
          height: 4.2rem;
        }
      }
      .merchant-info {
        margin-left: 1.6rem;
        display: flex;
        flex-direction: column;
        .name {
          font-size: @more-font-size;
          color: @title-color;
          font-weight: 500;
        }
        .tags {
          margin-top: 0.36rem;
          display: flex;
          .item {
            margin-right: 0.8rem;
            display: flex;
            align-items: center;
            font-size: @small-font-size;
            color: @desc-color;
            span {
              display: flex;
            }
          }
        }
      }
    }
    .title {
      ::v-deep .van-divider {
        font-size: @more-font-size;
      }
    }
    .detail {
      background-color: #fff;
      .content {
        padding: 0 10px;
        overflow-x: hidden;
        ::v-deep img {
          width: 100% !important;
        }
      }
    }
  }
  .buy-dialog {
    padding: 16px 6px;
    .title {
      display: flex;
      justify-content: center;
      font-size: 16px;
    }
    .desc {
      margin-top: 6px;
      display: flex;
      justify-content: center;
      font-size: 12px;
      color: #888;
    }
    .count {
      margin-top: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
    .price-total {
      margin-top: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }
}
</style>
