<template>
  <div class="category">
    <van-grid :border="false" column-num="5">
      <van-grid-item
        @click="onClick(cate.id)"
        v-for="(cate, index) in category"
        :text="cate.name"
        :icon="cate.icon"
        :key="index"
      />
    </van-grid>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vant'

export default {
  name: 'CollegeCategory',
  components: {
    'van-grid': Grid,
    'van-grid-item': GridItem,
  },
  props: {
    category: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onClick(id) {
      this.$router.push({
        path: `/college/category-page/${id}`,
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
