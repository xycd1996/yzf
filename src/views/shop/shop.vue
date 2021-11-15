<!-- Editor:xuyuchen -->
<template>
  <div class="shop">
    <div class="header">
      <div class="bk">
        <div class="search">
          <van-search shape="round" placeholder="请输入商品名称" readonly>
            <template #left>
              <div @click="$router.back()" class="back">
                <van-icon color="#000" size="1.6rem" name="arrow-left" />
              </div>
            </template>
          </van-search>
        </div>
        <div v-if="shopInfo.videos && shopInfo.videos.length" class="bk-video">
          <van-swipe @change="onChangeSwipe" indicator-color="white">
            <van-swipe-item height="206" v-for="item in shopInfo.videos" :key="item.id">
              <video
                @play="onPlayVideo(item.id)"
                ref="video"
                preload
                width="100%"
                height="206"
                controls
                :src="shopInfo.imgHost + item.url"
              >
                暂不支持视频播放
              </video>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="info">
        <div class="avatar">
          <van-image height="100%" width="100%" fit="cover" lazy-load :src="shopInfo.imgHost + shopInfo.logo || ''">
            <template v-slot:loading>
              <van-loading type="spinner" vertical size="20">加载中...</van-loading>
            </template>
            <template v-slot:error>
              <van-image :src="require('@assets/img/avatar_error.png')" />
            </template>
          </van-image>
        </div>
        <div class="title">
          <span>{{ shopInfo.title }}</span>
          <div v-if="shopInfo.type" class="tag">
            <van-tag type="primary">{{ shopInfo.type }}</van-tag>
          </div>
          <div class="rate">
            <van-rate size="1.26rem" count="5" :value="parseInt(shopInfo.consume_score)" readonly />
            <span>{{ parseInt(shopInfo.consume_score) }}分</span>
          </div>
        </div>
      </div>
      <div class="address">店铺地址：{{ shopInfo.address }}</div>
      <div v-if="shopInfo.content" class="description">{{ shopInfo.content }}</div>
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
      <van-empty :image="require('@assets/img/goods_none.svg')" v-if="!goodsList.length" description="暂无任何商品" />
    </div>
  </div>
</template>

<script>
import ShopApi from '@api/shop'
import GoodsCard from '@components/goods-card/goods-card'
import GoodsApi from '@api/goods'
import { Search, Icon, Image, Loading, Tag, List, Empty, Rate, Swipe, SwipeItem, Toast } from 'vant'

const PAGE_SIZE = 20

export default {
  components: {
    'van-search': Search,
    'van-icon': Icon,
    'van-image': Image,
    'van-loading': Loading,
    'van-tag': Tag,
    'goods-card': GoodsCard,
    'van-list': List,
    'van-empty': Empty,
    'van-rate': Rate,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem
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
      const { data } = await ShopApi.get({ shop_id: id })
      this.shopInfo = data
      this.handleVisitShop()
    },
    async _queryGoodsList() {
      const { data } = await GoodsApi.getAll({ page: this.page, shop_id: this.$route.params.id, pagesize: PAGE_SIZE })
      this.loading = false
      if (!data.items.length) {
        this.finished = true
        return
      }
      this.page++
      this.goodsList.push(...data.items)
    },
    onLoad() {
      this._queryGoodsList()
    },
    onChangeSwipe() {
      this.videoTimer && clearTimeout(this.videoTimer)
      this.$refs.video &&
        this.$refs.video.forEach((e) => {
          e.pause()
          e.currentTime = 0
        })
    },
    onPlayVideo(id) {
      if (this.videoTimer) {
        clearTimeout(this.videoTimer)
      }
      // 播放多久进行加积分
      const taskTime = this.shopInfo.rewardConf.time
      const taskUrl = this.shopInfo.rewardConf.url
      if (!taskTime) {
        return
      }
      this.videoTimer = setTimeout(() => {
        this.handleIncreasePoints(taskUrl, id)
      }, taskTime * 1000)
    },
    // 观看视频获得积分
    async handleIncreasePoints(url, videoId) {
      const { msg } = await ShopApi.increasePoints(url)({ id_video: videoId })
      Toast({
        message: msg,
        position: 'bottom'
      })
    },
    // 访问店铺获得积分
    handleVisitShop() {
      const rewardTime = this.shopInfo.rewardTime * 1000
      const id = this.$route.params.id
      this.visitTimer = setTimeout(async () => {
        const { msg } = await ShopApi.visitShop({ from_shop_id: id })
        Toast({
          message: msg,
          position: 'bottom'
        })
      }, rewardTime)
    }
  },
  destroyed() {
    clearTimeout(this.videoTimer)
    clearTimeout(this.visitTimer)
  }
}
</script>
<style lang="less" scoped>
@import '~@assets/less/theme.less';

.shop {
  .header {
    .bk {
      height: 260px;
      background: #000 url('../../assets/img/bk.jpeg') no-repeat;
      background-size: cover;
      .search {
        .back {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-right: 10px;
        }
      }
      .bk-video {
        background: #fff;
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
        font-size: @more-font-size;
        font-weight: 600;
        color: @title-color;
        .rate {
          display: flex;
          align-items: center;
          font-size: @medium-font-size;
          font-weight: 400;
          color: @desc-color;
          span {
            margin-left: 1rem;
          }
        }
      }
    }
    .address {
      padding: 0 2.4rem 0.8rem;
      background: #fff;
      font-size: @medium-font-size;
      color: @desc-color;
    }
    .description {
      margin-top: 1px;
      padding: 0.4rem 2.4rem 1rem;
      font-size: @small-font-size;
      color: @desc-color;
      background-color: #fff;
    }
  }
}
</style>
