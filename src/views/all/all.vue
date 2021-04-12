<!-- Editor:xuyuchen -->
<template>
  <div class="all">
    <van-sticky>
      <div class="search">
        <van-search show-action placeholder="请输入商品名称" @click="handleGoSearch" readonly input-align="center">
          <template #action>
            <div class="action" v-show="tabActive === 0">
              <van-icon size="2.2rem" @click="showMode = !showMode" :name="showMode ? require('@assets/img/list.svg') : require('@assets/img/card.svg')" />
            </div>
          </template>
          <template #left>
            <van-icon @click="$router.back()" size="2rem" name="arrow-left" />
          </template>
        </van-search>
      </div>
      <div class="switch">
        <van-tabs type="card" v-model="tabActive">
          <van-tab title="商品" />
          <van-tab title="店铺" />
        </van-tabs>
      </div>
      <div class="filter">
        <van-dropdown-menu>
          <van-dropdown-item @change="onChangeSales" v-model="sales" :options="salesOptions" />
          <van-dropdown-item @change="onChangePrice" v-model="price" :options="priceOptions" />
        </van-dropdown-menu>
      </div>
    </van-sticky>
    <goods-list :showMode="showMode" />
  </div>
</template>

<script>
import { Search, Sticky, Icon, Tabs, Tab, DropdownMenu, DropdownItem } from 'vant'
import GoodsList from './goods-list/goods-list'

export default {
  components: {
    'van-search': Search,
    'van-sticky': Sticky,
    'van-icon': Icon,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    'goods-list': GoodsList
  },
  data() {
    return {
      showMode: true,
      tabActive: 0,
      sales: 0,
      price: 0,
      priceOptions: [
        { text: '默认排序', value: 0 },
        { text: '价格升序', value: 1 },
        { text: '价格降序', value: 2 }
      ],
      salesOptions: [
        {
          text: '默认销量',
          value: 0
        },
        {
          text: '销量最高',
          value: 4
        }
      ]
    }
  },
  methods: {
    _reset() {
      this.page = 1
      this.goodsList = []
    },
    handleGoSearch() {
      this.$router.push('/search')
    },
    onChangeSales(value) {
      this.sales = value
      this.price = 0
      this._reset()
      this._queryAllGoods(value)
    },
    onChangePrice(value) {
      this.price = value
      this.sales = 0
      this._reset()
      this._queryAllGoods(value)
    }
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
  .switch,
  .filter {
    background: #fff;
  }
}
</style>
