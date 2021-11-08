<template>
  <div class="hot-topic">
    <div class="top">
      <div class="title">热门选题</div>
      <div class="more">查看更多>></div>
    </div>
    <div class="list">
      <van-grid :icon-size="44" :border="false" clickable :column-num="5">
        <van-grid-item
          v-for="(topic, index) in topics"
          :text="topic.title"
          :key="index"
          :icon="topic.background_image"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vant'

export default {
  name: 'CollegeHotTopic',
  components: {
    'van-grid': Grid,
    'van-grid-item': GridItem,
  },
  props: {
    topics: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="less" scoped>
.hot-topic {
  margin: 8px;
  background: #f1f2f3;
  border-radius: 10px;
  .top {
    padding: 16px 16px 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    .more {
      font-weight: normal;
      font-size: 14px;
      color: #888;
    }
  }
  .list {
    ::v-deep {
      .van-grid-item__content {
        background: #f1f2f3;
      }
      .van-icon__image {
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
}
</style>
