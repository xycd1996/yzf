<!-- Editor:xuyuchen -->
<template>
  <div class="shop">
    <div class="header">
      <div class="bk">
        <div class="search">
          <van-search shape="round" background="rgba(0,0,0,0)" placeholder="请输入商品名称" readonly>
            <template #left>
              <div @click="$router.back()" class="back">
                <van-icon color="#fff" size="1.6rem" name="arrow-left" />
              </div>
            </template>
          </van-search>
        </div>
      </div>
      <div class="info">
        <div class="avatar">
          <van-image height="100%" width="100%" fit="cover" lazy-load :src="shopInfo.photo">
            <template v-slot:loading>
              <van-loading type="spinner" vertical size="20">加载中...</van-loading>
            </template>
            <template v-slot:error>
              <van-image :src="require('@assets/img/avatar_error.png')" />
            </template>
          </van-image>
        </div>
        <div class="title">
          <span>{{shopInfo.title}}</span>
          <div v-if="shopInfo.type" class="tag">
            <van-tag type="primary">{{shopInfo.type}}</van-tag>
          </div>
        </div>
      </div>
      <div v-if="shopInfo.content" class="description">{{shopInfo.content}}</div>
    </div>
    <div class="goods-list">
      <van-list
        v-if="goodsList.length"
        finished-text="没有更多了"
        :finished="finished"
        v-model="loading"
        @load="onLoad"
        :immediate-check="false"
      >
        <goods-card v-for="goods in goodsList" class="goods" :goodsInfo="goods" :key="goods.id" />
      </van-list>
      <van-empty
        :image="require('@assets/img/goods_none.svg')"
        v-if="!goodsList.length"
        description="暂无任何商品"
      />
    </div>
  </div>
</template>

<script>
import ShopApi from '@api/shop'
import GoodsCard from '@components/goods-card/goods-card'
import GoodsApi from '@api/goods'
import { Search, Icon, Image, Loading, Tag, List, Empty } from 'vant'

export default {
  components: {
    'van-search': Search,
    'van-icon': Icon,
    'van-image': Image,
    'van-loading': Loading,
    'van-tag': Tag,
    'goods-card': GoodsCard,
    'van-list': List,
    'van-empty': Empty
  },
  data() {
    return {
      shopInfo: {},
      page: 1,
      goodsList: [],
      finished: false,
      loading: false
    }
  },
  mounted() {
    this._initialization()
  },
  methods: {
    _initialization() {
      this._queryShopInfo()
      this._queryGoodsList()
    },
    async _queryShopInfo() {
      const id = this.$route.params.id
      const res = await ShopApi.get(id)
      this.shopInfo = res
    },
    async _queryGoodsList() {
      const res = await GoodsApi.getAll({ page: this.page, shop_id: this.$route.params.id })
      this.loading = false
      if (!res.length) {
        this.finished = true
        return
      }
      this.page++
      this.goodsList.push(...res)
    },
    onLoad() {
      this._queryGoodsList()
    }
  }
}

</script>
<style lang="scss" scoped>
@import "@assets/scss/theme.scss";

.shop {
  .header {
    .bk {
      height: 14rem;
      background: #fff
        url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586372007733&di=25f50ad1c17b2bf1b0e01b173b7cbc42&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1447425589%2C2489704120%26fm%3D214%26gp%3D0.jpg")
        no-repeat;
      background-size: cover;
      .search {
        .back {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-right: 10px;
        }
      }
    }
    .info {
      display: flex;
      padding: 0 2.4rem;
      background-color: #fff;
      box-shadow: 0 -2px 8px #f0f0f0;
      .avatar {
        position: relative;
        bottom: 20px;
        width: 6.8rem;
        height: 6.8rem;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 0 6px #333;
      }
      .title {
        margin-top: 4px;
        display: flex;
        flex-direction: column;
        margin-left: 1.6rem;
        font-size: $more-font-size;
        font-weight: 600;
        color: $title-color;
      }
    }
    .description {
      margin-top: 1px;
      padding: 0.4rem 2.4rem 1rem;
      font-size: $small-font-size;
      color: $desc-color;
      background-color: #fff;
    }
  }
}
</style>