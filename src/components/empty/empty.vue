<template>
  <div class="empty">
    <van-empty image="network" description="网络错误">
      <van-button @click="onClick" class="button" round type="danger">重试</van-button>
    </van-empty>
  </div>
</template>

<script>
import { Button, Empty } from 'vant'

export default {
  components: {
    'van-empty': Empty,
    'van-button': Button
  },
  methods: {
    onClick() {
      location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.empty {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 999;
  .button {
    width: 160px;
    height: 40px;
  }
}
</style>
