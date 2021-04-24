<template>
  <div class="payment-info">
    <van-cell-group title="订单信息">
      <van-cell center title="店铺" :value="shopName" />
      <van-cell center title="订单号" :value="no" />
      <van-cell center title="付款时间" :value="payTime" />
      <van-cell center title="付款方式" :value="payMethod" />
      <van-cell center title="数量" :value="num" />
      <van-cell v-if="remark" center title="备注" :value="remark" />
      <van-cell center title="订单金额" :value="`￥${orderPrice}`" />
      <van-cell center title="订单积分" :value="score" />
      <van-cell center title="实付金额">
        <template #default>
          <span class="price-unit">{{ actualPrice }}</span>
        </template>
      </van-cell>
      <van-cell center title="实付积分">
        <template #default>
          <span style="color: #fe0200;">{{ actualScore }}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant'

export default {
  props: {
    shopName: String,
    no: String,
    payTime: String,
    payMethod: String,
    num: Number,
    remark: String,
    orderPrice: String,
    score: String,
    actualPrice: String,
    actualScore: String
  },
  components: {
    'van-cell-group': CellGroup,
    'van-cell': Cell
  }
}
</script>

<style></style>
