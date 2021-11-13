<template>
  <div class="home">
    <van-nav-bar
      safe-area-inset-top
      @click-left="onClose"
      @click-right="onClickSearch"
      placeholder
      border
      fixed
      title="商城首页"
    >
      <template #left>
        <van-icon name="cross" size="1.6rem" />
      </template>
      <template #right>
        <van-icon name="search" size="1.6rem" />
      </template>
    </van-nav-bar>
    <van-pull-refresh success-text="刷新成功" v-model="pullRefresh" @refresh="_onPullRefresh">
      <my-banner :bannerList="bannerList" />
      <van-grid :column-num="5" :border="false" center clickable>
        <van-grid-item :to="menu.url" :icon="menu.icon" v-for="(menu, index) in menus" :text="menu.name" :key="index" />
      </van-grid>
      <transition name="van-fade">
        <van-list
          @load="onLoad"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
        >
          <cate-product-list v-if="goodsList.length" :goodsList="goodsList" />
        </van-list>
      </transition>
      <van-loading v-if="!goodsList.length" class="loading" color="#fe0200" />
    </van-pull-refresh>
  </div>
</template>

<script>
import { Loading, PullRefresh, Grid, GridItem, NavBar, Icon, List } from 'vant'
import HomeApi from '@api/home'
import CateProductList from '@components/cate-product-list/cate-product-list'
import Banner from '@components/banner/banner'
import { closeWeb } from '@/utils/jsBridge'

const PAGE_SIZE = 20

export default {
  components: {
    'van-loading': Loading,
    'van-pull-refresh': PullRefresh,
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'cate-product-list': CateProductList,
    'my-banner': Banner,
    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-list': List,
  },
  data() {
    return {
      page: 1,
      pullRefresh: false,
      loading: false,
      finished: false,
      bannerList: [],
      goodsList: [],
      menus: [],
    }
  },
  mounted() {
    this._initialization()
  },
  methods: {
    onClose() {
      closeWeb()
    },
    onLoad() {
      this._queryProductList()
    },
    onClickSearch() {
      this.$router.push({
        name: 'Search',
      })
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
      const { data } = await HomeApi.getProduct({
        page: this.page,
        pagesize: PAGE_SIZE,
      })
      this.page++
      this.loading = false
      if (data.items.length < PAGE_SIZE) {
        this.finished = true
      }
      this.goodsList = this.goodsList.concat(...(data?.items ?? []))
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
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
  }
}
</style>
