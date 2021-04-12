<template>
  <div class="home">
    <van-nav-bar @click-right="onClickSearch" placeholder border fixed title="商城首页">
      <template #left>
        <van-icon name="cross" size="1.6rem" color="black"></van-icon>
      </template>
      <template #right>
        <van-icon name="search" size="1.6rem" color="black" />
      </template>
    </van-nav-bar>
    <van-pull-refresh success-text="刷新成功" v-model="pullRefresh" @refresh="_onPullRefresh">
      <my-banner :bannerList="bannerList" />
      <van-grid :column-num="5" :border="false" center clickable>
        <van-grid-item :to="menu.url" :icon="menu.icon" v-for="(menu, index) in menus" :text="menu.name" :key="index"></van-grid-item>
      </van-grid>
      <transition name="van-fade">
        <cate-product-list v-if="cateProductData.length" :cateProductData="cateProductData" />
      </transition>
      <van-loading v-if="!cateProductData.length" class="loading" color="#fe0200" />
    </van-pull-refresh>
  </div>
</template>

<script>
import { Loading, PullRefresh, Grid, GridItem, NavBar, Icon } from 'vant'
import HomeApi from '@api/home'
import CateProductList from '@components/cate-product-list/cate-product-list'
import Banner from '@components/banner/banner'

export default {
  components: {
    'van-loading': Loading,
    'van-pull-refresh': PullRefresh,
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'cate-product-list': CateProductList,
    'my-banner': Banner,
    'van-nav-bar': NavBar,
    'van-icon': Icon
  },
  data() {
    return {
      pullRefresh: false,
      bannerList: [],
      cateProductData: [],
      menus: []
    }
  },
  mounted() {
    this._initialization()
  },
  methods: {
    onClickSearch() {
      this.$router.push('/all')
    },
    _initialization() {
      this._queryBanner()
      this._queryProductList()
      this._queryMenus()
    },
    async _queryBanner() {
      const { data } = await HomeApi.getBanner()
      this.bannerList = data
    },
    async _queryProductList() {
      const { data } = await HomeApi.getProduct()
      this.cateProductData = data
    },
    async _queryMenus() {
      const { data } = await HomeApi.getMenus()
      this.menus = data
    },
    async _onPullRefresh() {
      await this._queryBanner()
      await this._queryProductList()
      await this._queryMenus()
      this.pullRefresh = false
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
  }
}
</style>
