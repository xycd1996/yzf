<template>
  <div class="content">
    <div class="swiper">
      <my-banner :bannerList="formatBannerList" height="10rem" />
    </div>
    <ul class="cate">
      <li v-for="item in cate" :key="item.id" class="cate-item">
        <div class="title">{{ item.name }}</div>
        <van-grid :border="false" :column-num="3" clickable>
          <van-grid-item
            :to="`/all?cateId=${child.id}`"
            v-for="child in item.childs"
            :key="child.id"
            :text="item.name"
          ></van-grid-item>
        </van-grid>
      </li>
    </ul>
  </div>
</template>

<script>
import Banner from '@components/banner/banner'
import { Grid, GridItem } from 'vant'

export default {
  props: {
    bannerList: {
      type: Array,
      default: () => []
    },
    cate: {
      type: Array,
      default: () => []
    }
  },
  components: {
    'my-banner': Banner,
    'van-grid': Grid,
    'van-grid-item': GridItem
  },
  computed: {
    formatBannerList() {
      const retBanner = this.bannerList.map((item) => ({
        id: item.id,
        photo: item.url
      }))
      return retBanner
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  box-sizing: border-box;
  .swiper {
    padding: 0.6rem 0.8rem;
  }
  .cate {
    padding: 0.6rem 0.8rem;
    .cate-item {
      margin-bottom: 0.6rem;
      .title {
        margin-bottom: 0.6rem;
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
  }
}
</style>
