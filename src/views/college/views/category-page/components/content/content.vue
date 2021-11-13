<template>
  <div class="content">
    <ul class="cate">
      <li class="cate-item" v-for="(cate, index) in cates" :key="index">
        <van-button size="small" color="linear-gradient(to right, #ff6034, #ee0a24)">{{ cate.title }}</van-button>
      </li>
    </ul>
    <div class="list">
      <div
        v-for="(item, index) in [1, 2, 3, 3, 1, 2, 2, 1, 3, 3, 1, 2, 1, 3, 2, 1, 1, 3]"
        :key="index"
        :data-type="item"
        class="item"
        ref="itemRef"
      >
        <picture-card v-if="item === 1" />
        <video-card v-if="item === 2" />
        <link-card v-if="item === 3" />
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'
import VideoCard from './dynamicCard/video-card.vue'
import PictureCard from './dynamicCard/picture-card.vue'
import LinkCard from './dynamicCard/link-card.vue'

export default {
  components: {
    'van-button': Button,
    'video-card': VideoCard,
    'picture-card': PictureCard,
    'link-card': LinkCard
  },
  data() {
    return {
      cates: [
        { title: '政策推动文件' },
        { title: '平台相关新闻' },
        { title: '易视智富平台规则' },
        { title: '平台功能介绍' }
      ]
    }
  },
  mounted() {
    this.waterFall()
  },
  methods: {
    waterFall() {
      // 页面宽度
      const pageWidth = this.getClient().width
      const items = this.$refs.itemRef
      // 单个宽度
      const itemWidth = items[0].offsetWidth
      // 可排列数
      const columns = parseInt(pageWidth / itemWidth, 10)
      // 定义一个数组用来存储元素高度
      const itemHeightArrs = []
      for (let i = 0; i < items.length; i++) {
        if (i < columns) {
          items[i].style.top = 0
          items[i].style.left = itemWidth * i + 'px'
          itemHeightArrs.push(items[i].offsetHeight)
        } else {
          let minHeight = itemHeightArrs[0]
          let index = 0
          for (let j = 0; j < itemHeightArrs.length; j++) {
            if (minHeight > itemHeightArrs[j]) {
              minHeight = itemHeightArrs[j]
              index = j
            }
          }
          items[i].style.top = itemHeightArrs[index] + 'px'
          items[i].style.left = items[index].offsetLeft + 'px'

          itemHeightArrs[index] = itemHeightArrs[index] + items[i].offsetHeight
        }
      }
    },
    getClient() {
      return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  .cate {
    padding: 10px 0;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    .cate-item {
      white-space: nowrap;
      margin: 0 6px;
    }
  }
  .list {
    position: relative;
    margin: 0 4px;
    display: flex;
    flex-wrap: wrap;
    .item {
      position: absolute;
      flex: 0 0 50%;
      width: 50%;
      padding: 4px;
      box-sizing: border-box;
    }
  }
}
</style>
