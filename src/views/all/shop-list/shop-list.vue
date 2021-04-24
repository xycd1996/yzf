<template>
  <div class="shop-list">
    <transition name="van-fade">
      <van-list
        v-if="shopList.length"
        v-model="loading"
        :immediate-check="false"
        finished-text="没有更多了"
        :finished="finished"
        @load="onLoad"
      >
        <ul class="list">
          <li class="item" v-for="shop in shopList" :key="shop.shop_id">
            <div class="top">
              <div class="avatar">
                <img :src="imgHost + shop.logo" :alt="shop.title" />
              </div>
              <div class="info">
                <span class="title">{{ shop.title }}</span>
                <div class="score">
                  <span>
                    <van-rate size="1.2rem" allow-half :value="Number(shop.consume_score)" readonly />
                  </span>
                  <span>{{ Number(shop.consume_score).toFixed(2) }}分</span>
                </div>
              </div>
              <div class="entry">
                <van-button
                  :to="`/shop/${shop.shop_id}`"
                  round
                  size="small"
                  plain
                  type="danger"
                  text="进 店"
                ></van-button>
              </div>
            </div>
            <div class="bottom">{{ shop.description }}</div>
          </li>
        </ul>
      </van-list>
    </transition>
    <van-loading v-if="!shopList.length && !finished" class="loading" color="#fe0200" />
    <van-empty v-if="!shopList.length && finished" image="search" description="没有结果" />
  </div>
</template>

<script>
import ShopApi from '@api/shop'
import { Button, Empty, List, Loading, Rate } from 'vant'

export default {
  components: {
    'van-list': List,
    'van-button': Button,
    'van-empty': Empty,
    'van-loading': Loading,
    'van-rate': Rate
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      shopList: [],
      imgHost: '',
      loading: false,
      finished: false
    }
  },
  mounted() {
    this._getShopList()
  },
  methods: {
    onLoad() {
      this._getShopList()
    },
    async _getShopList() {
      const { imgHost, data } = await ShopApi.getList({
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.$route.query.keyword
      })
      if (!data.length) {
        this.finished = true
        return
      }
      this.imgHost = imgHost
      this.shopList.push(...data)
      this.page++
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@assets/scss/theme.scss';

.shop-list {
  .list {
    padding: 0 10px;
    .item {
      margin: 10px 0;
      padding: 8px 6px;
      display: flex;
      background: #fff;
      flex-direction: column;
      border-radius: 4px;
      .top {
        display: flex;
        .avatar {
          flex: 0 0 5rem;
          width: 5rem;
          height: 5rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          overflow: hidden;
          img {
            width: 5rem;
            height: 5rem;
          }
        }
        .info {
          margin-left: 1rem;
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            font-size: $medium-font-size;
          }
          .score {
            display: flex;
            align-items: center;
            font-size: $less-font-size;
            color: $desc-color;
            span:last-child {
              margin-left: 1rem;
            }
          }
        }
        .entry {
          ::v-deep .van-button {
            width: 5rem;
          }
        }
      }
      .bottom {
        margin-top: 1rem;
        font-size: $less-font-size;
        color: $desc-color;
      }
    }
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
