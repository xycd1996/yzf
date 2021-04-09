<!-- Editor:xuyuchen -->
<template>
  <div class="goods-detail">
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
      </div>
      <div class="info">
        <div class="title van-multi-ellipsis--l2">{{ goodsDetail.title }}</div>
        <div class="desc">{{ goodsDetail.sub_title }}</div>
        <div class="price">
          <div class="integral">
            积分:
            <span>{{ goodsDetail.integralPrice }}</span>
          </div>
          <div class="money">
            (￥
            <span>{{ goodsDetail.price }}</span
            >)
          </div>
        </div>
      </div>
      <div class="stock">
        <span class="sales">销量:{{ goodsDetail.sales_num }}</span>
        <span class="surplus">剩余:{{ goodsDetail.num - goodsDetail.sales_num }}</span>
      </div>
      <div class="specs">
        <van-cell @click="handleSelectSku" title="选择" value="规格" is-link></van-cell>
      </div>
      <div class="title">
        <van-divider>商品详情</van-divider>
      </div>
      <div class="detail">
        <div v-if="goodsDetail.ticket_detail" class="content" v-html="goodsDetail.ticket_detail"></div>
        <van-empty v-if="!goodsDetail.ticket_detail" class="none" description="暂无商品详情" />
      </div>
      <div class="sku">
        <van-sku
          :close-on-click-overlay="true"
          :goods-id="goodsDetail.id"
          :goods="{ picture: goodsDetail.img_prefix + goodsDetail.index_photo }"
          :sku="goodsDetail.sku"
          :quota="goodsDetail.one_limit === 9999999 ? 0 : goodsDetail.one_limit"
          v-model="skuShow"
          @buy-clicked="handleBuy"
          @add-cart="handleAddCard"
        >
          <template #sku-header-price="props">
            <div class="van-sku__goods-price">
              <span class="van-sku__price-symbol">￥</span>
              <span class="van-sku__price-num">{{ props.price }}</span>
              <span
                v-if="props.original_price"
                style="text-decoration: line-through;color: #878787;padding-left: 5px;line-height: normal;vertical-align: middle"
                >原价:￥{{ props.original_price }}</span
              >
            </div>
          </template>
        </van-sku>
      </div>
      <div class="bottom-action">
        <van-goods-action>
          <van-goods-action-icon color="#fe0200" icon="shop-o" @click="handleGoShop" text="店铺" />
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon icon="star-o" text="收藏" />
          <van-goods-action-button @click="handleSelectSku" type="warning" text="加入购物车" />
          <van-goods-action-button @click="handleSelectSku" type="danger" text="立即购买" />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Swipe, SwipeItem, Loading, Cell, GoodsAction, GoodsActionIcon, GoodsActionButton, Empty, Notify, Sku, Divider, Toast } from 'vant'
import GoodsApi from '@api/goods'
import OrderApi from '@api/order'
import CartApi from '@api/cart'

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
    'van-sku': Sku,
    'van-divider': Divider
  },
  data() {
    return {
      goodsDetail: {},
      current: 0,
      swipersLength: 0,
      skuShow: false
    }
  },
  methods: {
    _initialization() {
      this._queryGoodsDetail()
    },
    async _queryGoodsDetail() {
      const id = this.$route.params.id
      const { data } = await GoodsApi.getDetail({ id })
      this._normalizePrice(data.sku.list)
      this.goodsDetail = data
      this.swipersLength = data.swipers.length
    },
    _normalizePrice(list) {
      list.forEach((el) => {
        if (el.price) {
          console.log(parseFloat(el.price))
          el.price = parseFloat(el.price) * 100
        }
      })
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
    handleSelectSku() {
      this.skuShow = true
    },
    async handleBuy(data) {
      await OrderApi.buy({ id: data.goodsId, num: data.selectedNum, specification_combine_id: data.selectedSkuComb.id })
      this.$router.push({
        path: `/settlement/${data.goodsId}`,
        query: {
          specification_combine_id: data.selectedSkuComb.id,
          num: data.selectedNum
        }
      })
    },
    async handleAddCard(data) {
      const { data: res } = await CartApi.add({
        id: data.goodsId,
        num: data.selectedNum,
        specification_combine_id: data.selectedSkuComb.id
      })
      this.skuShow = false
      Toast.success({
        message: res.msg,
        forbidClick: true
      })
    }
  },
  mounted() {
    this._initialization()
  }
}
</script>
<style lang="scss" scoped>
@import '@assets/scss/theme';

.goods-detail {
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
      background-color: #fff;
      .custom-indicator {
        position: absolute;
        right: 10px;
        bottom: 10px;
        padding: 4px 8px;
        font-size: $small-font-size;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
      }
    }
    .info {
      padding: 8px 16px;
      background-color: #fff;
      .title {
        font-weight: 600;
        font-size: $large-font-size;
        color: $title-color;
      }
      .desc {
        line-height: 1.6;
        font-size: $less-font-size;
        color: $desc-color;
      }
      .price {
        display: flex;
        flex-direction: column;
        .integral {
          font-size: $less-font-size;
          span {
            font-size: $large-font-size;
            color: $theme-color;
          }
        }
        .money {
          font-size: $less-font-size;
          color: $theme-color;
          span {
            font-size: $large-font-size;
          }
        }
      }
    }
    .stock {
      margin: 1px 0;
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: $less-font-size;
      color: $title-color;
      background-color: #fff;
    }
    .specs {
      margin: 10px 0;
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
