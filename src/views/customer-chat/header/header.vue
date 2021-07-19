<template>
  <div class="header">
    <van-nav-bar placeholder safe-area-inset-top fixed :title="getNavBarTitle" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon @click="handleRefresh" name="replay" size="16" />
      </template>
    </van-nav-bar>
    <div class="goodsInfo">
      <img class="coverImage" :src="goodsInfo.img_prefix + goodsInfo.index_photo" />
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
</template>

<script>
import { Icon, NavBar, Button } from 'vant'
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
    'van-button': Button
  },
  computed: {
    getNavBarTitle() {
      return this.$route.query.shopName
    },
    isSecondhand() {
      return GOODS_TYPE[this.goodsInfo.product_type]?.name !== '二手商品'
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
  display: flex;
  padding: 10px 16px;
  background: #fff;
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
</style>
