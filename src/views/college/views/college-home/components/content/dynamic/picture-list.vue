<template>
  <div class="picture-list">
    <van-list finished-text="没有更多了" v-model="loading" :finished="finished" @load="onLoad">
      <ul class="list">
        <li class="item" v-for="article in articleList" :key="article.id">
          <div class="container">
            <div class="coverPath">
              <van-image height="88" width="88" fit="cover" :src="article.image" lazy-load />
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
    'van-image': Image
  },
  props: {
    active: Number
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20,
      articleList: []
    }
  },
  methods: {
    async onLoad() {
      const { data } = await Api.getList({ cate_id: this.active, page: this.page, pagesize: this.pageSize })
      this.articleList = data.items
      this.loading = false
      if (data.items?.length < this.pageSize || !data.items?.length) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.picture-list {
  .list {
    padding: 0 8px;
    .item {
      padding: 4px;
      .container {
        display: flex;
        width: 100%;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        border: 1px solid #eee;
        box-shadow: 2px 2px 10px #ddd;
        .coverPath {
          flex: 0 0 88px;
          width: 88px;
          height: 88px;
          overflow: hidden;
        }
        .info {
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1 1 auto;
          .title {
            font-size: 16px;
            font-weight: 500;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
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
