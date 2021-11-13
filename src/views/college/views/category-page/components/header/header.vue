<template>
  <div class="header">
    <div class="bk" />
    <div @click="$router.back()" class="back">
      <van-icon name="arrow-left" size="20" color="#fff" />
    </div>
    <div class="title">平台政策</div>
    <div class="description">了解易视智富平台政策导向、规则、更好的创作，我是平台政策介绍。</div>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: {
    'van-icon': Icon
  },
  props: {
    title: String,
    description: String
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 200px;
  .bk {
    position: absolute;
    top: 0;
    width: 100%;
    height: 200px;
    background-image: url('https://qnm.hunliji.com/o_1fkcv2e1f1kot1jhc120i1i6b1hh5e.jpeg');
    background-size: 100% 200px;
    background-position: center;
    z-index: -1;
  }
  .back {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 6px;
    background-color: rgba(0, 0, 0, 0.226);
    border-radius: 50%;
  }
  .title {
    font-size: 28px;
    font-weight: bold;
    color: #f1f1f1;
  }
  .description {
    padding: 8px 6px;
    margin: 8px 12px;
    font-size: 12px;
    color: #333;
    background-color: #ffffff81;
    border-radius: 8px;
  }
}
</style>
