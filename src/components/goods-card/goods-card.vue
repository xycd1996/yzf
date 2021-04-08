<!-- Editor:xuyuchen -->
<template>
  <div :class="!showMode ? 'goods-list' : 'goods-card'">
    <div @click="handleClick" :class="!showMode ? 'list-container' : 'card-container'">
      <div v-if="!showMode" class="list-mode">
        <van-cell>
          <van-card lazy-load :thumb="goodsInfo.index_photo" :tag="goodsInfo.cate_name">
            <template #title>
              <div class="title van-multi-ellipsis--l1">{{goodsInfo.title}}</div>
            </template>
            <template #desc>
              <div class="desc van-multi-ellipsis--l2">{{goodsInfo.sub_title}}</div>
            </template>
            <template #price>
              <div class="price price-unit">{{goodsInfo.price}}</div>
            </template>
            <template #num>已售{{goodsInfo.sales_num}}</template>
          </van-card>
        </van-cell>
      </div>
      <div v-if="showMode" class="card-mode">
        <div class="img">
          <van-image fit="fit" width="100%" height="100%" :src="goodsInfo.index_photo" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" vertical size="20">加载中...</van-loading>
            </template>
            <template v-slot:error>加载失败</template>
          </van-image>
        </div>
        <div class="goods-info">
          <div class="top">
            <div class="title van-multi-ellipsis--l2">{{goodsInfo.title}}</div>
          </div>
          <div class="bottom">
            <div class="price price-unit">
              <span>{{goodsInfo.price}}</span>
            </div>
            <div class="sales">
              <span>已售{{goodsInfo.sales_num}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Loading, Notify, Cell, Card } from 'vant'

export default {
  components: {
    'van-image': Image,
    'van-loading': Loading,
    'van-cell': Cell,
    'van-card': Card,
  },
  props: {
    goodsInfo: {
      type: Object,
      required: true,
      default: () => { }
    },
    showMode: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick() {
      if (!this.goodsInfo.id) {
        Notify({ message: '商品不存在' })
        return
      }
      this.$router.push({ path: `/goods/${this.goodsInfo.id}` })
    }
  }
}

</script>
<style lang="scss" scoped>
@import "@assets/scss/theme";

.goods-list {
  .list-container {
    .title {
      font-size: $more-font-size;
      font-weight: 600;
      color: $title-color;
    }
    .desc {
      line-height: 1.6;
      font-size: $small-font-size;
      color: $desc-color;
    }
    .price {
      font-size: $more-font-size;
      color: $theme-color;
    }
  }
}

.goods-card {
  padding: 10px;
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  .card-container {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 4px $desc-color;
    background-color: #fff;
    .card-mode {
      .img {
        width: 100%;
        height: 15.6rem;
      }
      .goods-info {
        padding: 10px;
        .top {
          height: 4rem;
          font-size: $medium-font-size;
          font-weight: 600;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: $large-font-size;
            color: $theme-color;
          }
          .sales {
            display: flex;
            align-items: center;
            font-size: $small-font-size;
            color: $desc-color;
          }
        }
      }
    }
  }
}
</style>