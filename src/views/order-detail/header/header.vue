<template>
  <div class="header">
    <van-nav-bar safe-area-inset-top title="订单详情" @click-left="$router.back()">
      <template #left>
        <van-icon name="arrow-left" color="#000" size="1.6rem" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { Icon, NavBar } from 'vant'
export default {
  components: {
    'van-nav-bar': NavBar,
    'van-icon': Icon
  }
}
</script>

<style></style>
