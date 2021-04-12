<template>
  <van-swipe class="my-swipe" :style="`height: ${height}`" :autoplay="3000" indicator-color="white">
    <van-swipe-item :key="index" v-for="(banner, index) in bannerList">
      <van-image :height="height" style="color: #333" width="100%" fit="contain" lazy-load :src="banner.photo">
        <template #loading>
          <van-loading type="spinner" vertical size="20">加载中...</van-loading>
        </template>
        <template #error>加载失败</template>
      </van-image>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Loading, Swipe, SwipeItem, Image } from 'vant'

export default {
  props: {
    bannerList: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: '16rem'
    }
  },
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-loading': Loading,
    'van-image': Image
  }
}
</script>

<style lang="scss" scoped>
.my-swipe {
  height: 16rem;
  background-color: rgba(220, 220, 220, 0.8);
}
</style>
