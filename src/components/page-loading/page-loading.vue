<template>
  <div>
    <div v-if="loading" class="page-loading">
      <van-loading vertical color="#1989fa">
        加载中...
      </van-loading>
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Loading } from 'vant'

export default {
  props: {
    loading: {
      default: true,
      type: Boolean
    }
  },
  components: {
    'van-loading': Loading
  }
}
</script>

<style lang="less" scoped>
.page-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 99;
}
</style>
