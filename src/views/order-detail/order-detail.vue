<template>
  <div class="order-detail">
    <page-loading :loading="loading">
      <van-popup closeable v-model="payMethodSelet" round position="bottom">
        <van-cell-group title="请选择支付方式">
          <van-cell @click="handleWechatPay()" title="微信支付" clickable is-link />
        </van-cell-group>
      </van-popup>
      <order-header />
      <order-address
        v-if="productTypeName !== '票务'"
        :name="detailInfo.appoint_name"
        :address="detailInfo.address_all"
        :phone="detailInfo.appoint_phone"
      />
      <product-info
        :orderInfo="detailInfo"
        :orderList="detailInfo.lists"
        :title="detailInfo.shop_name"
        :orderStatus="detailInfo.status"
        :expressPrice="detailInfo.express_price_total"
        :totalPrice="detailInfo.order_price"
        :totalIntegral="detailInfo.integral_total"
        :productId="detailInfo.product_id"
        :handleCancelOrder="cancelOrder"
        :handlePayment="handlePayment"
      />
      <qrcode-info v-if="productTypeName === '票务'" :qrcodeList="detailInfo.tickes" />
      <payment-info
        :shopName="detailInfo.shop_name"
        :no="detailInfo.order_no"
        :payTime="detailInfo.order_pay_time"
        :payMethod="payMethod"
        :num="detailInfo.product_count"
        :remark="detailInfo.order_desc"
        :orderPrice="detailInfo.order_need_price"
        :score="detailInfo.integral_total"
        :actualPrice="detailInfo.product_price_total"
        :actualScore="detailInfo.integral_total"
      />
    </page-loading>
  </div>
</template>

<script>
import OrderApi from '@api/order'
import Address from './address/address'
import Header from './header/header'
import PaymentInfo from './payment-info/payment-info'
import QRCodeInfo from './qrcode-info/qrcode-info'
import ProductInfo from './product-info/product-info'
import { PAYMENT_METHOD } from './constants'
import PageLoading from '@components/page-loading/page-loading'
import { Cell, CellGroup, Popup, Toast } from 'vant'
import wxPay from '@/assets/js/wxPay'
import { GOODS_TYPE } from '@constants'

export default {
  name: 'OrderDetail',
  components: {
    'van-popup': Popup,
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'order-address': Address,
    'order-header': Header,
    'payment-info': PaymentInfo,
    'product-info': ProductInfo,
    'page-loading': PageLoading,
    'qrcode-info': QRCodeInfo
  },
  data() {
    return {
      detailInfo: {},
      loading: true,
      payMethodSelet: false
    }
  },
  computed: {
    payMethod() {
      return PAYMENT_METHOD[this.detailInfo.pay_channel]
    },
    productTypeName() {
      return GOODS_TYPE[this.detailInfo.product_type]?.name
    }
  },
  mounted() {
    this._queryOrderDetail()
  },
  methods: {
    async handleWechatPay() {
      const id = this.detailInfo.order_id
      Toast.loading({
        message: '正在支付...',
        mask: true,
        duration: 0
      })
      const { data } = await OrderApi.pendingOrderPay({
        pay_type: 'money',
        order_id: id,
        pay_channel: 'wx'
      })
      wxPay(data)
    },
    async _queryOrderDetail() {
      const orderId = this.$route.params.id
      const { data } = await OrderApi.detail({ order_id: orderId })
      this.detailInfo = data
      this.loading = false
    },
    handlePayment() {
      this.payMethodSelet = true
    },
    async cancelOrder() {
      const orderId = this.$route.params.id
      await OrderApi.cancelOrder({
        order_id: orderId
      })
      Toast.success('取消成功')
      this._queryOrderDetail()
    }
  }
}
</script>
