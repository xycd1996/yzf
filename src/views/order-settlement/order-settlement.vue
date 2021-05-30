<!-- Editor:xuyuchen -->
<template>
  <div class="order-settlement">
    <div @click="handleDelivery" class="delivery-info">
      <div class="position">
        <img :src="require('@assets/img/position.svg')" width="100%" height="100%" alt="position" />
      </div>
      <div class="info">
        <div v-if="addressInfo" class="top">
          <span class="name">{{ addressInfo.ConsigneeName }}</span>
          <span class="mobile">{{ addressInfo.ConsigneePhone }}</span>
        </div>
        <div v-if="addressInfo" class="bottom">
          <span class="address">{{ (addressInfo.DetailCity || '') + addressInfo.DetailAddr }}</span>
        </div>
        <div v-if="!addressInfo" class="add">点击添加新地址</div>
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
            <van-cell title="配送方式" value="快递" />
          </div>
          <div class="remark">
            <van-field v-model="remark" type="textarea" placeholder="请输入留言" autosize label="买家留言" />
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
            <template #label>
              <span>支付：{{ payTypeChange(key, orderDetail.count) }}</span>
              <br />
              <span v-if="key === 'integral'">剩余：{{ orderDetail.leftIntegral }}积分</span>
            </template>
            <template #right-icon>
              <van-radio :name="key" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="bottom">
      <van-submit-bar button-text="提交订单" @submit="handleSubmit" :price="totalPrice">
        <template #default>
          <div>共{{ totalNum }}件</div>
        </template>
      </van-submit-bar>
    </div>
    <div class="payment">
      <van-popup closeable v-model="payMethodSelet" position="bottom">
        <van-cell-group title="请选择支付方式">
          <van-cell @click="handleWechatPay()" title="微信支付" clickable is-link />
        </van-cell-group>
      </van-popup>
    </div>
  </div>
</template>

<script>
import OrderApi from '@api/order'
import UserApi from '@api/user'
import CartApi from '@api/cart'
import { SubmitBar, Icon, Card, Tag, RadioGroup, Radio, Cell, CellGroup, Field, Dialog, Toast, Popup } from 'vant'
import { mapActions, mapGetters } from 'vuex'
import wxPay from '@assets/js/wxPay'

export default {
  components: {
    'van-submit-bar': SubmitBar,
    'van-icon': Icon,
    'van-card': Card,
    'van-tag': Tag,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-field': Field,
    'van-popup': Popup
  },
  data() {
    return {
      orderDetail: {},
      payType: 'integral',
      remark: '',
      payMethodSelet: false
    }
  },
  computed: {
    ...mapGetters(['addressInfo']),
    totalNum() {
      return this.orderDetail.count?.total_num ?? 0
    },
    totalPrice() {
      switch (this.payType) {
        case 'money':
          return this.orderDetail.count?.total_order_money * 100
        case 'mix':
          return this.orderDetail.count?.total_product_money * 100
        default:
          return 0
      }
    }
  },
  methods: {
    ...mapActions(['setAddressInfo']),
    async handleWechatPay() {
      Toast.loading({
        mask: true,
        duration: 0,
        message: '正在支付...'
      })
      const res = await this._orderPay('wx') // 暂时写死微信支付
      wxPay(res)
    },
    payTypeChange(pay, count) {
      switch (pay) {
        case 'integral':
          return `${count.total_product_integral}积分`
        case 'money':
          return `￥${count.total_order_money}`
        case 'mix':
          return `${count.total_product_integral}积分+￥${count.total_product_money}`
        default:
          return ''
      }
    },
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
    handleSubmit() {
      // 积分支付
      if (this.payType === 'integral') {
        Dialog.confirm({
          title: '积分支付确认',
          message: `确认是否支付${this.orderDetail?.count?.total_product_integral}积分`
        }).then(async () => {
          Toast.loading({
            mask: true,
            message: '正在支付...',
            duration: 0
          })
          await this._orderPay()
          Toast.success({
            message: '支付成功',
            mask: true,
            duration: 2000,
            onClose: () =>
              this.$router.replace({
                name: 'Order'
              })
          })
        })
      } else {
        this.payMethodSelet = true
      }
    },
    async _orderPay(payChannel) {
      const goodsId = this.$route.params.id
      const fromCart = this.$route.query.fromCart
      const params = {
        id: this.orderDetail.list?.[0]?.goods?.[0]?.product_id,
        address_all: (this.addressInfo?.DetailCity ?? '') + this.addressInfo?.DetailAddr,
        specification_combine_id: this.$route.query.specification_combine_id,
        num: this.$route.query.num,
        appoint_phone: this.addressInfo?.ConsigneePhone,
        appoint_name: this.addressInfo?.ConsigneeName,
        appoint_addressid: this.addressInfo?.id,
        order_desc: this.remark,
        pay_type: this.payType,
        pay_channel: payChannel,
        goods_cart_ids: goodsId
      }
      if (fromCart) {
        const { data } = await CartApi.orderPay(params)
        return data
      } else {
        const { data } = await OrderApi.orderPay(params)
        return data
      }
    },
    async _queryDefaultAddress() {
      if (!this.addressInfo) {
        const { data } = await UserApi.address()
        data && this.setAddressInfo(data)
      }
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
<style lang="less" scoped>
@import '~@assets/less/theme.less';

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
          font-size: @medium-font-size;
        }
        .mobile {
          font-size: @less-font-size;
          color: @desc-color;
        }
      }
      .bottom {
        font-size: @small-font-size;
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
          font-size: @medium-font-size;
        }
        .count {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          .piece {
            margin-right: 0.5rem;
            font-size: @small-font-size;
            color: @desc-color;
          }
          .subtotal {
            font-size: @less-font-size;
            span {
              color: @theme-color;
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
