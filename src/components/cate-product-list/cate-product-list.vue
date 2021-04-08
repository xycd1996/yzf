<!-- Editor:xuyuchen -->
<template>
  <div class="cate-product-list">
    <van-cell-group
      class="container"
      v-for="cate in cateProductData"
      :key="cate.cate_id"
      :title="`${cate.name} - ${cate.description}`"
    >
      <goods-card v-for="goods in cate.lists" :key="goods.id" :goodsInfo="goods" />
    </van-cell-group>
  </div>
</template>

<script>
import { CellGroup } from 'vant'
import GoodsCard from '@components/goods-card/goods-card'

export default {
  components: {
    'van-cell-group': CellGroup,
    'goods-card': GoodsCard,
  },
  props: {
    cateProductData: {
      type: Array,
      default: () => []
    }
  }
}

</script>
<style lang="scss" scoped>
.cate-product-list {
  .container {
    background-color: #f7f8fa;
  }
}
</style>