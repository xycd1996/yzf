<!-- Editor:xuyuchen -->
<template>
  <div class="all">
    <van-sticky>
      <div class="search">
        <van-search
          show-action
          placeholder="请输入商品名称"
          @click="handleGoSearch"
          readonly
          input-align="center"
        >
          <template #action>
            <div class="action">
              <van-icon
                size="2.2rem"
                @click="showMode = !showMode"
                :name="showMode ? require('@assets/img/list.svg') : require('@assets/img/card.svg')"
              />
            </div>
          </template>
        </van-search>
      </div>
    </van-sticky>
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
          <goods-card
            :showMode="showMode"
            v-for="goods in goodsList"
            :key="goods.id"
            :goodsInfo="goods"
          />
        </div>
      </van-list>
    </transition>
    <van-loading v-if="!goodsList.length" class="loading" color="#fe0200" />
  </div>
</template>

<script>
import { Search, List, Sticky, Loading, Icon } from 'vant'
import GoodsGard from '@components/goods-card/goods-card'
import GoodsApi from '@api/goods'

export default {
  components: {
    'goods-card': GoodsGard,
    'van-search': Search,
    'van-list': List,
    'van-sticky': Sticky,
    'van-loading': Loading,
    'van-icon': Icon
  },
  data() {
    return {
      page: 1,
      goodsList: [],
      finished: false,
      loading: false,
      showMode: true
    }
  },
  methods: {
    _initialization() {
      this._queryAllGoods()
    },
    async _queryAllGoods() {
      const res = await GoodsApi.getAll({ page: this.page, keyword: '' })
      this.loading = false
      if (!res.length) {
        this.finished = true
        return
      }
      this.goodsList.push(...res)
    },
    onLoad() {
      this.page++
      this._queryAllGoods()
    },
    handleGoSearch() {
      this.$router.push('/search')
    }
  },
  mounted() {
    this._initialization()
  }
}

</script>
<style lang="scss" scoped>
.all {
  position: relative;
  .search {
    .action {
      display: flex;
      align-items: center;
    }
  }
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