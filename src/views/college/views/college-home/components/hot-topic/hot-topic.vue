<template>
  <div class="hot-topic">
    <div class="top">
      <div class="title">热门选题</div>
    </div>
    <div class="list">
      <van-grid :icon-size="44" :border="false" clickable :column-num="5">
        <van-grid-item
          @click="onClick(topic.id)"
          v-for="(topic, index) in topics"
          :text="topic.name"
          :key="index"
          :icon="topic.background_image"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vant'
import { openTopic } from '@/utils/jsBridge'

export default {
  name: 'CollegeHotTopic',
  components: {
    'van-grid': Grid,
    'van-grid-item': GridItem
  },
  props: {
    topics: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onClick(id) {
      openTopic(id)
    }
  }
}
</script>

<style lang="less" scoped>
.hot-topic {
  margin: 8px;
  background: #fff;
  border-radius: 10px;
  .top {
    padding: 16px 16px 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
  }
  .list {
    ::v-deep {
      .van-icon__image {
        border-radius: 50%;
        object-fit: cover;
      }
      .van-grid-item__text {
        white-space: nowrap;
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
