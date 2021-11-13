<template>
  <div class="loading">
    <van-loading vertical color="#0094ff">加载中...</van-loading>
  </div>
</template>

<script>
import { Loading } from 'vant'

export default {
  components: {
    'van-loading': Loading
  }
}
</script>

<style lang="less" scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  z-index: 999;
}
</style>
