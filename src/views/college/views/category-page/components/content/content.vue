<template>
  <div class="content">
    <ul class="cate">
      <li @click="changeCate(cate.id)" class="cate-item" v-for="cate in cates" :key="cate.id">
        <van-button size="small" color="linear-gradient(to right, #ff6034, #ee0a24)">{{ cate.name }}</van-button>
      </li>
    </ul>
    <div class="list">
      <div v-for="(item, index) in list" :key="index" class="item" ref="itemRef">
        <picture-card v-if="item.type === cardTypes.PICTURE_CARD" :detail="item" />
        <video-card v-if="item.type === cardTypes.VIDEO_CARD" :detail="item" />
        <link-card v-if="item.type === 2" />
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'
import VideoCard from './dynamicCard/video-card.vue'
import PictureCard from './dynamicCard/picture-card.vue'
import LinkCard from './dynamicCard/link-card.vue'
import Api from '../../api'
import { CardTypes } from '../../../../constants'

export default {
  props: {
    cates: {
      type: Array,
      default: () => []
    }
  },
  components: {
    'van-button': Button,
    'video-card': VideoCard,
    'picture-card': PictureCard,
    'link-card': LinkCard
  },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      imgHost: '',
      topicId: this.$route.params.id
    }
  },
  async mounted() {
    this.onScroll()
    await this.getList()
    this.$nextTick(() => {
      this.waterFall()
    })
  },
  computed: {
    cardTypes() {
      return CardTypes
    }
  },
  methods: {
    waterFall() {
      // 页面宽度
      const pageWidth = this.getClient().width
      const items = this.$refs.itemRef
      if (!items?.length) {
        return
      }
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
    },
    changeCate(cateId) {
      this.page = 1
      this.finished = false
      this.list = []
      this.topicId = cateId
      this.getList()
    },
    async getList() {
      if (this.finished) {
        return
      }
      this.loading = true
      const { data } = await Api.getTopicList({ topic_id: this.topicId, page: this.page, pagesize: this.pageSize })
      this.imgHost = data.imgHost
      this.list = this.list.concat(data.items)
      this.page++
      if (this.pageSize > data.items) {
        this.finished = true
      }
    },
    onScroll() {
      window.addEventListener('scroll', (e) => {
        console.log('e: ', e)
      })
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
