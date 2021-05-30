<template>
  <div class="goods-list">
    <transition name="van-fade">
      <van-list
        v-if="goodsList.length"
        v-model="loading"
        :immediate-check="false"
        finished-text="没有更多了"
        :finished="finished"
        @load="onLoad"
      >
        <div class="product-list">
          <goods-card :showMode="showMode" v-for="goods in goodsList" :key="goods.id" :goodsInfo="goods" />
        </div>
      </van-list>
    </transition>
    <van-loading v-if="!goodsList.length && !finished" class="loading" color="#fe0200" />
    <van-empty v-if="!goodsList.length && finished" image="search" description="没有结果" />
  </div>
</template>

<script>
import { Empty, List, Loading } from 'vant'
import GoodsGard from '@components/goods-card/goods-card'
import GoodsApi from '@api/goods'

const PAGE_SIZE = 20

export default {
  props: {
    showMode: Boolean,
    sales: Number,
    price: Number
  },
  data() {
    return {
      page: 1,
      goodsList: [],
      finished: false,
      loading: false
    }
  },
  components: {
    'van-list': List,
    'van-loading': Loading,
    'van-empty': Empty,
    'goods-card': GoodsGard
  },
  methods: {
    _initialization() {
      this._queryAllGoods()
    },
    async _queryAllGoods(sortType) {
      const { data } = await GoodsApi.getAll({
        page: this.page,
        keyword: this.$route.query.keyword,
        pagesize: PAGE_SIZE,
        sortType
      })
      this.loading = false
      if (!data.items.length) {
        this.finished = true
        return
      }
      console.log(data)
      this.goodsList.push(...data.items)
    },
    _reset() {
      this.page = 1
      this.goodsList = []
    },
    onLoad() {
      this.page++
      this._queryAllGoods()
    },
    changeSortType(sortType) {
      this._reset()
      this._queryAllGoods(sortType)
    }
  },
  mounted() {
    this._initialization()
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  .product-list {
    background-color: #fff;
  }
  .loading {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }
}
</style>
