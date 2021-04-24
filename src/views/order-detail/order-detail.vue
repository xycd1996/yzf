<template>
  <div class="order-detail">
    <order-header />
    <order-address
      :name="detailInfo.appoint_name"
      :address="detailInfo.address_all"
      :phone="detailInfo.appoint_phone"
    />
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
  </div>
</template>

<script>
import OrderApi from '@api/order'
import Address from './address/address'
import Header from './header/header'
import PaymentInfo from './payment-info/payment-info'
import { PAYMENT_METHOD } from './constants'

export default {
  name: 'OrderDetail',
  components: {
    'order-address': Address,
    'order-header': Header,
    'payment-info': PaymentInfo
  },
  data() {
    return {
      detailInfo: {}
    }
  },
  computed: {
    payMethod() {
      return PAYMENT_METHOD[this.detailInfo.pay_channel]
    }
  },
  mounted() {
    this._queryOrderDetail()
  },
  methods: {
    async _queryOrderDetail() {
      const orderId = this.$route.params.id
      console.log('orderId: ', orderId)
      const { data } = await OrderApi.detail({ order_id: orderId })
      this.detailInfo = data
    }
  }
}
</script>
