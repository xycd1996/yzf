<template>
  <div class="shop-list">
    <van-nav-bar safe-area-inset-top title="可核销店铺" />
    <ul class="list">
      <li
        v-for="shopItem in shopList"
        :key="shopItem.shop_id"
        @click="handleClickShop(shopItem.shop_id, shopItem.shop_name)"
        class="shop-item"
      >
        <img class="avatar" :src="shopItem.logo" />
        <div class="name">
          {{ shopItem.shop_name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import AdminApi from '@api/administrator'

export default {
  name: 'AdminShopList',
  components: {
    'van-nav-bar': NavBar
  },
  data() {
    return {
      shopList: [],
      checkerInfo: {}
    }
  },
  mounted() {
    this.queryShopList()
  },
  methods: {
    async queryShopList() {
      const { data } = await AdminApi.shopList()
      this.shopList = data.shops
      this.checkerInfo = data.checker
    },
    handleClickShop(shopId, shopName) {
      this.$router.push({
        name: 'AdminCheckOff',
        params: {
          shopId: shopId
        },
        query: {
          shopName: shopName,
          avatar: this.checkerInfo.headimg,
          nickname: this.checkerInfo.nickname
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.shop-list {
  .list {
    width: 100%;
    .shop-item {
      position: relative;
      margin: 8px 6px;
      padding: 6px;
      display: flex;
      background: #fff;
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        object-fit: cover;
      }
      .name {
        margin-left: 8px;
        font-size: 16px;
      }
    }
  }
}
</style>
