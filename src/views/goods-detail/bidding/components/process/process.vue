<template>
  <div class="process">
    <div class="title">竞拍流程</div>
    <div class="step">
      <van-icon size="2.4rem" color="#efb336" name="gold-coin-o" />
      <span>参与出价</span>
    </div>
    <div class="step">
      <van-icon size="2.4rem" color="#efb336" name="flower-o" />
      <span>价高者得</span>
    </div>
    <div class="step">
      <van-icon size="2.4rem" color="#efb336" name="balance-pay" />
      <span>支付货款</span>
    </div>
    <div class="step">
      <van-icon size="2.4rem" color="#efb336" name="completed" />
      <span>签收宝贝</span>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: {
    'van-icon': Icon
  }
}
</script>

<style lang="less" scoped>
@import '~@assets/less/theme';

.process {
  margin: 10px 0;
  padding: 1.2rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  .title {
    font-size: @medium-font-size;
  }
  .step {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: @medium-font-size;
    .van-icon {
      padding: 4px 4px;
      background: #f1f1f1;
      border-radius: 50%;
    }
  }
}
</style>
