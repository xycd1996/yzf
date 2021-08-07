<template>
  <div class="fallback">
    <img src="https://qnm.hunliji.com/o_1fcgjl0a713in1n4dorhqfh1tvr9.jpg" alt="" class="avatar" />
    <div class="shop-name">店铺名称</div>
    <div class="price">￥10.00</div>
    <div class="goods-name">订单名称</div>
    <div class="coupon-code">券码：12312342245</div>
    <div class="create-time">下单时间：2021-08-12 18:12:21</div>
    <div class="action">
      <van-button class="cancel">取消</van-button>
      <van-button type="danger" class="ok">确认核销</van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'

export default {
  name: 'AdminFallback',
  components: {
    'van-button': Button
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
