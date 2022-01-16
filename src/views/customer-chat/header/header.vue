<template>
  <div class="header">
    <van-nav-bar
      placeholder
      safe-area-inset-top
      fixed
      :title="getNavBarTitle"
      @click-left="onClickLeft"
      left-arrow
    >
      <template #right>
        <van-icon @click="handleRefresh" name="replay" size="16" />
      </template>
    </van-nav-bar>
    <div v-if="goodsInfo.id" class="goodsInfo">
      <div class="container">
        <div class="coverImage">
          <van-image
            fit="cover"
            lazy-load
            width="50px"
            height="50px"
            :src="goodsInfo.img_prefix + goodsInfo.index_photo || ''"
          >
            <template #loading>
              <van-loading type="spinner" vertical size="20">加载中...</van-loading>
            </template>
            <template #error>加载失败</template>
          </van-image>
        </div>

        <div class="desc">
          <div class="title">{{ goodsInfo.title }}</div>
          <div class="sold">
            <span class="intergal">积分：{{ goodsInfo.integralPrice }}</span>
            <span class="price price-unit">{{ goodsInfo.price }}</span>
          </div>
          <div class="tip">交易前聊一聊</div>
        </div>
        <div v-if="isSecondhand" class="exchange-button">
          <van-button @click="handleExchange" size="small" type="danger">立即兑换</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, NavBar, Button, Image, Loading } from 'vant'
import GoodsApi from '@api/goods'
import { GOODS_TYPE } from '@constants'

export default {
  data() {
    return {
      goodsInfo: {}
    }
  },
  props: {
    onRefresh: Function
  },
  components: {
    'van-icon': Icon,
    'van-nav-bar': NavBar,
    'van-button': Button,
    'van-image': Image,
    'van-loading': Loading
  },
  computed: {
    getNavBarTitle() {
      return this.$route.query.shopName
    },
    isSecondhand() {
      return GOODS_TYPE[this.goodsInfo.product_type]?.name === '二手商品'
    }
  },
  mounted() {
    this._queryGoodsInfo()
  },
  methods: {
    handleExchange() {
      this.$router.push({
        name: 'Settlement',
        params: {
          id: this.$route.query.goodsId
        }
      })
    },
    onClickLeft() {
      this.$router.back()
    },
    handleRefresh() {
      this.onRefresh()
    },
    async _queryGoodsInfo() {
      const goodsId = this.$route.query.goodsId
      if (!goodsId) {
        return
      }
      const { data } = await GoodsApi.getDetail({ id: goodsId })
      this.goodsInfo = data
    }
  }
}
</script>

<style lang="less" scoped>
.goodsInfo {
  top: 46px;
  height: 78px;
  .container {
    position: fixed;
    width: 100%;
    display: flex;
    padding: 10px 16px;
    background: #fff;
    z-index: 9;
    .coverImage {
      flex: 0 0 50px;
      margin-right: 10px;
      width: 50px;
      height: 50px;
      border-radius: 4px;
    }
    .desc {
      flex: 1 1 auto;
      .title {
        font-weight: 600;
        font-size: 1.2rem;
      }
      .sold {
        margin-top: 2px;
      }
      .tip {
        margin-top: 2px;
        color: #888;
      }
    }
  }
}
</style>
