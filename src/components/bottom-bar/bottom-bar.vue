<template>
  <footer class="bottom-bar">
    <van-tabbar :route="true" active-color="#FE0200" placeholder>
      <van-tabbar-item to="/">
        <span>首页</span>
        <template #icon="props">
          <van-icon size="2rem" :name="props.active ? 'shop' : 'shop-o'" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/category">
        <span>全部</span>
        <template #icon="props">
          <van-icon size="2rem" :name="props.active ? 'point-gift' : 'point-gift-o'" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/order">
        <span>订单</span>
        <template #icon="props">
          <van-icon size="2rem" :name="props.active ? 'balance-list' : 'balance-list-o'" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/cart">
        <span>购物车</span>
        <template #icon="props">
          <van-icon size="2rem" :name="props.active ? 'shopping-cart' : 'shopping-cart-o'" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from 'vant'
export default {
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem,
    'van-icon': Icon
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>
