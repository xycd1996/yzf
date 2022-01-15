<!-- 竞拍商品 -->
<template>
  <div class="bidding">
    <van-loading v-if="!Object.keys(goodsDetail).length" class="loading" color="#fe0200" />
    <div v-if="Object.keys(goodsDetail).length" class="container">
      <div class="swipe">
        <van-swipe indicator-color="white" @change="swipeChange">
          <van-swipe-item v-for="(img, index) in goodsDetail.photos" :key="index">
            <van-image width="100%" height="34rem" fit="cover" :src="img">
              <template v-slot:loading>
                <van-loading type="spinner" vertical size="20">加载中...</van-loading>
              </template>
              <template v-slot:error>加载失败</template>
            </van-image>
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/{{ goodsDetail.photos.length || 0 }}</div>
          </template>
        </van-swipe>
        <div @click="onClickBack" class="back">
          <van-icon color="#fff" name="arrow-left" size="1.6rem" />
        </div>
      </div>
      <div :class="`biddingInfo ${getCurrentStatusBk}`">
        <div class="text">{{ getCurrentStatus }}</div>
        <div class="countdown">
          <span>距截拍：</span>
          <van-count-down :time="goodsDetail.valid_end - goodsDetail.valid_begin" format="DD 天 HH 时 mm 分 ss 秒" />
        </div>
      </div>
      <div class="info">
        <div class="text">
          <div class="title van-multi-ellipsis--l2">{{ goodsDetail.title }}</div>
          <div class="desc">
            <span class="desc-item">
              <van-tag plain type="danger">起拍</van-tag>
              <span>￥{{ goodsDetail.price }}</span>
            </span>
            <span class="desc-item">
              <van-tag plain type="danger">加价</van-tag>
              <span>￥{{ goodsDetail.auction_step_price }}</span>
            </span>
            <span class="desc-item">
              <van-tag plain type="danger">保证金</van-tag>
              <span>￥{{ goodsDetail.auction_promise_price }}</span>
            </span>
          </div>
        </div>
        <div @click="handleCollect" class="collect">
          <van-icon :name="collect ? 'star' : 'star-o'" size="2rem" :color="collect ? 'gold' : 'black'" />
          <span>{{ collect ? '已收藏' : '收藏' }}</span>
        </div>
      </div>
      <m-process />
      <m-bidding-list />
      <div class="merchant">
        <div class="avatar">
          <img :src="goodsDetail.shop_logo" />
        </div>
        <div class="merchant-info">
          <div class="name">{{ goodsDetail.shop_name }}</div>
          <ul class="tags">
            <li class="item">
              <span>
                <van-icon name="passed" color="red" size="1rem" />
              </span>
              <span>企业认证</span>
            </li>
          </ul>
          <div class="description">
            <van-button type="danger" size="small">拍卖说明</van-button>
          </div>
        </div>
      </div>
      <div class="title">
        <van-divider :hairline="false">货品详情</van-divider>
      </div>
      <div class="detail">
        <div v-if="goodsDetail.content" class="content" v-html="goodsDetail.content"></div>
        <van-empty v-if="!goodsDetail.content" class="none" description="暂无商品详情" />
      </div>
      <div class="bottom-action">
        <van-goods-action>
          <van-goods-action-icon @click="onCustomerChat" icon="chat-o" text="客服" />
          <van-goods-action-button
            v-if="goodsDetail.promiseOrder.pay_status !== 2"
            @click="handleBidding"
            type="danger"
            :text="`缴纳保证金￥${goodsDetail.auction_promise_price}`"
          />
          <van-goods-action-button
            v-if="goodsDetail.promiseOrder.pay_status === 1"
            @click="handleBidding"
            type="danger"
            text="出价"
          />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Image,
  Swipe,
  SwipeItem,
  Loading,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Empty,
  Divider,
  Icon,
  CountDown,
  Tag,
  Button
} from 'vant'
import Api from './api'
import Process from './components/process/process'
import BiddingList from './components/bidding-list/bidding-list'
import { STATUS_TEXT, STATUS_BK } from './constants'

export default {
  components: {
    'van-image': Image,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-loading': Loading,
    'van-goods-action': GoodsAction,
    'van-goods-action-icon': GoodsActionIcon,
    'van-goods-action-button': GoodsActionButton,
    'van-empty': Empty,
    'van-divider': Divider,
    'van-icon': Icon,
    'van-tag': Tag,
    'van-count-down': CountDown,
    'van-button': Button,
    'm-process': Process,
    'm-bidding-list': BiddingList
  },
  data() {
    return {
      goodsDetail: {},
      current: 0,
      collect: false
    }
  },
  computed: {
    getCurrentStatus() {
      return STATUS_TEXT[this.goodsDetail.auction_status]
    },
    getCurrentStatusBk() {
      return STATUS_BK[this.goodsDetail.auction_status]
    }
  },
  methods: {
    _initialization() {
      this._queryGoodsDetail()
    },
    async _queryGoodsDetail() {
      const id = this.$route.params.id
      const { data } = await Api.getBiddingDetail({ id })
      this.goodsDetail = data
    },

    onCustomerChat() {
      this.$router.push({
        name: 'CustomerChat',
        params: {
          id: this.goodsDetail?.shop_id
        },
        query: {
          shopName: this.goodsDetail?.shop_name ?? '未知店铺'
        }
      })
    },
    handleCollect() {
      this.collect = !this.collect
    },
    onClickBack() {
      this.$router.back()
    },
    swipeChange(index) {
      this.current = index
    },
    handleBidding() {}
  },
  mounted() {
    this._initialization()
  }
}
</script>
<style lang="less" scoped>
@import '~@assets/less/theme';

.bidding {
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
    .biddingInfo {
      padding: 0 1.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      color: #fff;
      .text {
        font-size: @large-font-size;
      }
      .countdown {
        display: flex;
        align-items: center;
        font-size: @less-font-size;
        .van-count-down {
          font-size: @less-font-size;
          color: #fff;
        }
      }
    }
    .pending {
      background: rgb(49, 198, 243);
    }
    .progress {
      background: crimson;
    }
    .end {
      background: #ccc;
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
          margin-top: 1rem;
          display: flex;
          line-height: 1.6;
          font-size: @less-font-size;
          color: @desc-color;
          .desc-item {
            margin-right: 10px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .van-tag {
              margin-right: 4px;
            }
          }
        }
      }
      .collect {
        flex: 0 0 auto;
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
    .merchant {
      position: relative;
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
        .description {
          position: absolute;
          right: 1.6rem;
        }
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
}
</style>
