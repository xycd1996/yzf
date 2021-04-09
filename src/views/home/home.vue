<template>
  <div class="home">
    <van-pull-refresh success-text="刷新成功" v-model="pullRefresh" @refresh="_onPullRefresh">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item :key="index" v-for="(banner, index) in bannerList">
          <van-image height="16rem" style="color: #333" width="100%" fit="contain" lazy-load :src="banner.photo">
            <template v-slot:loading>
              <van-loading type="spinner" vertical size="20">加载中...</van-loading>
            </template>
            <template v-slot:error>加载失败</template>
          </van-image>
        </van-swipe-item>
      </van-swipe>
      <transition name="van-fade">
        <cate-product-list v-if="cateProductData.length" :cateProductData="cateProductData" />
      </transition>
      <van-loading v-if="!cateProductData.length" class="loading" color="#fe0200" />
    </van-pull-refresh>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image, Loading, PullRefresh } from 'vant'
import HomeApi from '@api/home'
import CateProductList from '@components/cate-product-list/cate-product-list'

export default {
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-image': Image,
    'van-loading': Loading,
    'van-pull-refresh': PullRefresh,
    'cate-product-list': CateProductList
  },
  data() {
    return {
      pullRefresh: false,
      bannerList: [],
      cateProductData: []
    }
  },
  mounted() {
    this._initialization()
  },
  methods: {
    _initialization() {
      this._queryBanner()
      this._queryProductList()
    },
    async _queryBanner() {
      const { data } = await HomeApi.getBanner()
      this.bannerList = data
    },
    async _queryProductList() {
      const { data } = await HomeApi.getProduct()
      this.cateProductData = data
    },
    async _onPullRefresh() {
      await this._queryBanner()
      await this._queryProductList()
      this.pullRefresh = false
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .my-swipe {
    height: 16rem;
    background-color: rgba(220, 220, 220, 0.8);
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
  }
}
</style>
