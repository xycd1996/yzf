<template>
  <div class="shop-list">
    <van-nav-bar title="可核销店铺" />
    <ul class="list">
      <li
        v-for="shopItem in shopList"
        :key="shopItem.shop_id"
        @click="handleClickShop(shopItem.shop_id)"
        class="shop-item"
      >
        <img class="avatar" :src="shopItem.logo" />
        <div class="name">
          {{ shopItem.shop_name }}
        </div>
        <div class="entry">
          <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" size="mini">
            进入
          </van-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Button, NavBar } from 'vant'
import AdminApi from '@api/administrator'

export default {
  name: 'AdminShopList',
  components: {
    'van-nav-bar': NavBar,
    'van-button': Button
  },
  data() {
    return {
      shopList: []
    }
  },
  mounted() {
    this.queryShopList()
  },
  methods: {
    async queryShopList() {
      const { data } = await AdminApi.shopList()
      this.shopList = data.shops
    },
    handleClickShop(shopId) {
      console.log('shopId: ', shopId)
      this.$router.push({
        name: 'AdminCheckOff',
        params: {
          shopId: shopId
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
      .entry {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
    }
  }
}
</style>
