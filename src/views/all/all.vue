<!-- Editor:xuyuchen -->
<template>
  <div class="all">
    <van-sticky>
      <div class="search">
        <van-search
          show-action
          :placeholder="tabActive ? '请输入店铺名称' : '请输入商品名称'"
          @click="handleGoSearch"
          readonly
          :value="$route.query.keyword"
          input-align="center"
        >
          <template #action>
            <div class="action" v-show="tabActive === 0">
              <van-icon
                size="2.2rem"
                @click="showMode = !showMode"
                :name="showMode ? require('@assets/img/list.svg') : require('@assets/img/card.svg')"
              />
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
      <div v-if="tabActive === 0" class="filter">
        <van-dropdown-menu>
          <van-dropdown-item @change="onChangeSales" v-model="sales" :options="salesOptions" />
          <van-dropdown-item @change="onChangePrice" v-model="price" :options="priceOptions" />
        </van-dropdown-menu>
      </div>
    </van-sticky>
    <goods-list v-if="tabActive === 0" :showMode="showMode" :sales="sales" :price="price" ref="goodsRef" />
    <shop-list v-if="tabActive === 1" />
  </div>
</template>

<script>
import { Search, Sticky, Icon, Tabs, Tab, DropdownMenu, DropdownItem } from 'vant'
import GoodsList from './goods-list/goods-list'
import ShopList from './shop-list/shop-list'

export default {
  components: {
    'van-search': Search,
    'van-sticky': Sticky,
    'van-icon': Icon,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    'goods-list': GoodsList,
    'shop-list': ShopList
  },
  data() {
    return {
      showMode: true,
      tabActive: Number(this.$route.params.type) ?? 0,
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
    handleGoSearch() {
      this.$router.push({
        name: 'Search'
      })
    },
    onChangeSales(value) {
      this.sales = value
      this.price = 0
      this.$refs.goodsRef.changeSortType(value)
    },
    onChangePrice(value) {
      this.price = value
      this.sales = 0
      this.$refs.goodsRef.changeSortType(value)
    }
  },
  watch: {
    tabActive: function(val) {
      this.$router.replace({
        params: {
          type: val
        },
        query: {
          ...this.$route.query
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.all {
  position: relative;
  .search {
    .action {
      display: flex;
      align-items: center;
    }
  }
  .switch {
    padding-bottom: 10px;
  }
  .switch,
  .filter {
    background: #fff;
  }
}
</style>
