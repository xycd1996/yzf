<!-- Editor:xuyuchen -->
<template>
  <div class="cate-product-list">
    <goods-card v-for="goods in goodsList" :key="goods.id" :goodsInfo="goods" />
  </div>
</template>

<script>
import GoodsCard from '../goods-card/goods-card'

export default {
  components: {
    'goods-card': GoodsCard
  },
  props: {
    goodsList: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="less" scoped>
.cate-product-list {
  .container {
    background-color: #f7f8fa;
  }
}
</style>
