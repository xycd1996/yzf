<template>
  <div class="goods-list">
    <transition name="van-fade">
      <van-list v-if="goodsList.length" v-model="loading" :immediate-check="false" finished-text="没有更多了" :finished="finished" @load="onLoad">
        <div class="product-list">
          <goods-card :showMode="showMode" v-for="goods in goodsList" :key="goods.id" :goodsInfo="goods" />
        </div>
      </van-list>
    </transition>
    <van-loading v-if="!goodsList.length" class="loading" color="#fe0200" />
  </div>
</template>

<script>
import { List, Loading } from 'vant'
import GoodsGard from '@components/goods-card/goods-card'
import GoodsApi from '@api/goods'

export default {
  props: {
    showMode: Boolean
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
    'goods-card': GoodsGard
  },
  methods: {
    _initialization() {
      this._queryAllGoods()
    },
    async _queryAllGoods(sortType) {
      const { data } = await GoodsApi.getAll({ page: this.page, keyword: '', pageSize: 10, sortType })
      this.loading = false
      if (!data.length) {
        this.finished = true
        return
      }
      this.goodsList.push(...data)
    },
    onLoad() {
      this.page++
      this._queryAllGoods()
    }
  },
  mounted() {
    this._initialization()
  }
}
</script>

<style lang="scss" scoped>
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
