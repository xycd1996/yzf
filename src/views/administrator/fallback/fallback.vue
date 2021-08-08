<template>
  <div class="fallback">
    <img src="https://qnm.hunliji.com/o_1fcgjl0a713in1n4dorhqfh1tvr9.jpg" alt="" class="avatar" />
    <div class="price">￥{{ ticket.product_price }}</div>
    <div class="goods-name">{{ ticket.product_title }}</div>
    <div class="coupon-code">券码：{{ ticket.discount_no }}</div>
    <div class="create-time">下单时间：{{ ticket.order_pay_time }}</div>
    <div class="action">
      <van-button class="cancel" @click="handleCancel">取消</van-button>
      <van-button :disabled="ticket.type != 1" type="danger" class="ok" @click="handleOk">{{
        ticket.type_msg
      }}</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Toast } from 'vant'
import AdminApi from '@api/administrator'

export default {
  name: 'AdminFallback',
  components: {
    'van-button': Button
  },
  data() {
    return {
      ticket: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { data } = await AdminApi.checkDetail({
        discount_no: this.$route.params.code
      })
      this.ticket = data.ticket
    },
    handleCancel() {
      this.$router.push({ name: 'AdminShopList' })
    },
    async handleOk() {
      Toast.loading({
        message: '正在核销中...',
        forbidClick: true
      })
      await AdminApi.checkCode({
        discount_no: this.$route.params.code
      })
      Toast.success({
        message: '核销成功',
        forbidClick: true,
        onClose: () => this.$router.push({ name: 'AdminShopList' })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.fallback {
  padding: 16px;
  margin: 10px;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .shop-name {
    margin-top: 10px;
    font-size: 16px;
  }
  .price {
    padding: 16px 0;
    font-size: 36px;
    font-weight: 600;
    color: #fe0200;
  }
  .goods-name {
    padding: 8px 0;
    font-size: 18px;
  }
  .coupon-code {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    &::after {
      margin: 24px 0;
      content: '';
      display: flex;
      width: 80vw;
      height: 1px;
      background: #ccc;
    }
  }
  .action {
    margin-top: 30px;
    .cancel {
      margin-right: 10px;
      width: 120px;
    }
    .ok {
      width: 120px;
    }
  }
}
</style>
