<template>
  <div class="picture-list">
    <van-list finished-text="没有更多了" v-model="loading" :finished="finished" @load="onLoad">
      <ul class="list">
        <li class="item" v-for="article in articleList" :key="article.id">
          <div class="container">
            <div class="coverPath">
              <van-image height="160" width="100%" fit="cover" :src="article.image" lazy-load />
            </div>
            <div class="info">
              <div class="title">{{ article.title }}</div>
              <div class="merchant">
                <img class="logo" :src="article.authorHeadImage" />
                <div class="span">{{ article.authorName }}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { Image, List } from 'vant'
import Api from '../../../api'

export default {
  components: {
    'van-list': List,
    'van-image': Image,
  },
  props: {
    active: Number,
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20,
      articleList: [],
    }
  },
  methods: {
    async onLoad() {
      const { data } = await Api.getList({ cate_id: this.active, page: this.page, pagesize: this.pageSize })
      this.articleList = data.data
      this.loading = false
      if (data.data.length < this.pageSize) {
        this.finished = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
.picture-list {
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 8px;
    .item {
      box-sizing: border-box;
      padding: 4px;
      flex: 0 0 50%;
      width: 50%;
      .container {
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        border: 1px solid #eee;
        box-shadow: 2px 2px 10px #ddd;
        .info {
          padding: 8px;
          .title {
            font-size: 16px;
            font-weight: 500;
            display: inline-block;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .merchant {
            margin-top: 4px;
            display: flex;
            align-items: center;
            .logo {
              margin-right: 6px;
              border-radius: 50%;
              width: 28px;
              height: 28px;
            }
          }
        }
      }
    }
  }
}
</style>
