<template>
  <div class="content">
    <van-tabs v-model="active" :ellipsis="false">
      <van-tab :name="tab.id" v-for="tab in tabList" :key="tab.id" :title="tab.name" />
    </van-tabs>
    <van-list finished-text="没有更多了" v-model="loading" :finished="finished" @load="onLoad">
      <ul class="list">
        <li class="item" v-for="article in articleList" :key="article.id">
          <div class="container">
            <div class="coverPath">
              <van-image height="160" width="100%" fit="cover" :src="article.coverPath" lazy-load />
            </div>
            <div class="info">
              <div class="title">{{ article.title }}</div>
              <div v-if="article.merchant" class="merchant">
                <img class="logo" :src="article.merchant.logo" />
                <div class="span">{{ article.merchant.name }}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { Image, List, Tab, Tabs } from 'vant'
import Api from '../../api'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-list': List,
    'van-image': Image,
  },
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: this.tabList[0].id,
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20,
      articleList: [],
    }
  },
  methods: {
    async onLoad() {
      this.loading = true
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
.content {
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 4px 8px;
    .item {
      box-sizing: border-box;
      padding: 4px;
      flex: 0 0 50%;
      width: 50%;
      .container {
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        .info {
          padding: 4px;
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
