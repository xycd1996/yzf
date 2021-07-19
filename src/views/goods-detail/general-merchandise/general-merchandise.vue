<!-- 普通商品 -->
<template>
  <div class="general-merchandise">
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
          <van-cell clickable @click="handleSelectSku" title="选择" value="规格" is-link />
          <van-cell>
            <template #title>
              <div class="express">
                <span>送至 铜仁</span>
                <span class="line"></span>
                <span class="express-fee">快递：15元</span>
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
          <van-goods-action-icon @click="onCustomerChat" icon="chat-o" text="客服" />
          <van-goods-action-icon @click="$router.push({ name: 'Cart' })" icon="shopping-cart-o" text="购物车" />
          <van-goods-action-button @click="handleSelectSku" type="warning" text="加入购物车" />
          <van-goods-action-button @click="handleSelectSku" type="danger" text="立即购买" />
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
  Cell,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Empty,
  Notify,
  Sku,
  Divider,
  Toast,
  Icon,
  CellGroup
} from 'vant'
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
    'van-divider': Divider,
    'van-icon': Icon,
    'van-cell-group': CellGroup
  },
  data() {
    return {
      goodsDetail: {},
      current: 0,
      swipersLength: 0,
      skuShow: false,
      collect: false
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
          el.price = parseFloat(el.price) * 100
        }
      })
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
    handleCollect() {
      this.handleSelectSku()
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
      const { msg } = await CartApi.add({
        id: data.goodsId,
        num: data.selectedNum,
        specification_combine_id: data.selectedSkuComb.id
      })
      this.skuShow = false
      Toast.success({
        message: msg,
        forbidClick: true
      })
    }
  },
  mounted() {
    this._initialization()
  }
}
</script>
<style lang="less" scoped>
@import '~@assets/less/theme';

.general-merchandise {
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
    .stock {
      margin: 1px 0;
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: @less-font-size;
      color: @title-color;
      background-color: #fff;
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
}
</style>
