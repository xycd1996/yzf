<template>
  <div class="category-page">
    <my-header :title="detail.name" :description="detail.description" :backgroundImage="detail.backgroud_image" />
    <div class="search">
      <van-search placeholder="请输入搜索关键词" v-model="searchVal" />
    </div>
    <my-content :cates="topicCate" />
  </div>
</template>

<script>
import { Search } from 'vant'
import Header from './components/header/header.vue'
import Content from './components/content/content.vue'
import Api from './api'

export default {
  components: {
    'my-header': Header,
    'van-search': Search,
    'my-content': Content
  },
  data() {
    return {
      searchVal: '',
      detail: {},
      topicCate: []
    }
  },
  mounted() {
    this.getDetail()
    this.getTopicCate()
  },
  methods: {
    async getDetail() {
      const id = this.$route.params.id
      const { data } = await Api.getTopicDetail({ id })
      this.detail = data
    },
    async getTopicCate() {
      const id = this.$route.params.id
      const { data } = await Api.getTopicCate({ pid: id })
      this.topicCate = data
    }
  }
}
</script>

<style lang="less" scoped></style>
