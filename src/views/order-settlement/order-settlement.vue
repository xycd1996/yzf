<!-- Editor:xuyuchen -->
<template>
  <div class="order-settlement">
    <div @click="handleDelivery" class="delivery-info">
      <div class="position">
        <img src="../../assets/img/position.svg" width="100%" height="100%" alt="position" />
      </div>
      <div class="info">
        <div v-if="Object.keys(address).length" class="top">
          <span class="name">{{ address.ConsigneeName }}</span>
          <span class="mobile">{{ address.ConsigneePhone }}</span>
        </div>
        <div v-if="Object.keys(address).length" class="bottom">
          <span class="address">{{ address.DetailCity + address.DetailAddr }}</span>
        </div>
        <div v-if="!Object.keys(address).length" class="add">点击添加新地址</div>
      </div>
      <van-icon name="arrow" size="1.2rem" color="#aaa" class="arrow" />
    </div>
    <div class="goods-order">
      <ul class="shop">
        <li v-for="shop in orderDetail.list" :key="shop.shop_id" class="shop-item">
          <div class="shop-name">
            <van-tag mark type="danger">店铺</van-tag>
            <span style="margin-left: 10px;">{{ shop.shop_name }}</span>
          </div>
          <div v-for="goods in shop.goods" :key="goods.product_id" class="goods">
            <van-card
              :num="goods.product_num"
              :thumb="orderDetail.img_prefix + goods.product_photo"
              :desc="goods.product_specification_combine_value"
              :title="goods.product_title"
              :price="goods.price"
            ></van-card>
          </div>
          <div class="delivery-method">
            <span>配送方式</span>
            <span>快递</span>
          </div>
          <div class="count">
            <span class="piece">共1件</span>
            <span class="subtotal">
              小计:
              <span class="price-unit">{{ shop.count.total_product_money }}</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="pay-method">
      <van-radio-group v-model="payType">
        <van-cell-group>
          <van-cell
            :icon="key === 'money' ? 'gold-coin-o' : 'points'"
            v-for="(payType, key) in orderDetail.payType"
            clickable
            :key="key"
            :title="payType"
            @click="radio = key"
          >
            <template #right-icon>
              <van-radio :name="key" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="bottom">
      <van-submit-bar button-text="提交订单" @submit="handleSubmit" :price="123123"></van-submit-bar>
    </div>
  </div>
</template>

<script>
import OrderApi from '@api/order'
import UserApi from '@api/user'
import { SubmitBar, Icon, Card, Tag, RadioGroup, Radio, Cell, CellGroup } from 'vant'

export default {
  components: {
    'van-submit-bar': SubmitBar,
    'van-icon': Icon,
    'van-card': Card,
    'van-tag': Tag,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'van-cell': Cell,
    'van-cell-group': CellGroup
  },
  data() {
    return {
      orderDetail: {},
      address: {},
      payType: ''
    }
  },
  methods: {
    async _queryOrderDetail() {
      const goodsId = this.$route.params.id
      const fromCart = this.$route.query.fromCart
      if (fromCart) {
        const { data } = await OrderApi.multipleDetail({ goods_cart_ids: goodsId })
        this.orderDetail = data
        return
      }
      const num = this.$route.query.num
      const specification_combine_id = this.$route.query.specification_combine_id
      const { data } = await OrderApi.singleDetail({ id: goodsId, num, specification_combine_id })
      this.orderDetail = data
    },
    async handleSubmit() {},
    async _queryDefaultAddress() {
      const { data } = await UserApi.address()
      data && (this.address = data)
    },
    handleDelivery() {
      this.$router.push('/address')
    }
  },
  mounted() {
    this._queryOrderDetail()
    this._queryDefaultAddress()
  }
}
</script>
<style lang="scss" scoped>
@import '@assets/scss/theme.scss';

.order-settlement {
  margin: 1rem;
  overflow: hidden;
  margin-bottom: 50px;
  .delivery-info {
    display: flex;
    align-items: center;
    padding: 1.4rem 1rem;
    border-radius: 10px;
    background: #fff;
    .position {
      flex: 0 0 3rem;
      padding-right: 0.6rem;
    }
    .info {
      flex: 1 1 auto;
      line-height: 1.8rem;
      .top {
        display: flex;
        .name {
          margin-right: 0.6rem;
          font-size: $medium-font-size;
        }
        .mobile {
          font-size: $less-font-size;
          color: $desc-color;
        }
      }
      .bottom {
        font-size: $small-font-size;
      }
    }
    .arrow {
      flex: 0 0 0.6rem;
    }
  }

  .goods-order {
    .shop {
      .shop-item {
        margin: 1rem 0;
        padding: 1.4rem 1rem;
        border-radius: 10px;
        background: #fff;
        .shop-name {
          margin-bottom: 1.4rem;
          display: flex;
          align-items: center;
          font-size: $medium-font-size;
        }
        .delivery-method {
          padding: 1rem 0;
          display: flex;
          justify-content: space-between;
          font-size: $less-font-size;
          span:last-child {
            color: $desc-color;
          }
        }
        .count {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          .piece {
            margin-right: 0.5rem;
            font-size: $small-font-size;
            color: $desc-color;
          }
          .subtotal {
            font-size: $less-font-size;
            span {
              color: $theme-color;
            }
          }
        }
      }
    }
  }

  .pay-method {
    margin-bottom: 10px;
    border-radius: 10px;
    background: #fff;
  }
}
</style>
