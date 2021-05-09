<template>
  <div class="address">
    <div class="icon">
      <van-icon size="3.6rem" color="#fe0200" name="cart-circle" />
    </div>
    <div class="info">
      <div class="top">
        <div class="name">收货人：{{ name }}</div>
        <div class="phone">{{ phone }}</div>
      </div>
      <div class="bottom">收货地址：{{ address }}</div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  props: {
    address: String,
    name: String,
    phone: String
  },
  components: {
    'van-icon': Icon
  }
}
</script>

<style lang="less" scoped>
@import '~@assets/less/theme.less';

.address {
  height: 68px;
  padding: 1.2rem 1.4rem;
  display: flex;
  align-items: center;
  background: #fff;
  .icon {
    margin-right: 1rem;
  }
  .info {
    flex: 1 1 auto;
    font-size: @medium-font-size;
    .top {
      display: flex;
      justify-content: space-between;
    }
    .bottom {
      font-size: @less-font-size;
      color: #888;
    }
  }
}
</style>
