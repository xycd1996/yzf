<template>
  <div class="college">
    <my-banner objectFit="cover" :bannerList="bannerList" />
    <div class="search">
      <van-search v-model="searchVal" placeholder="请输入搜索关键词" />
    </div>
    <my-category :category="category" />
    <my-hot-topic :topics="topics" />
    <my-content v-if="tabList.length" :tabList="tabList" />
  </div>
</template>

<script>
import Banner from '@components/banner/banner'
import { Search } from 'vant'
import Category from './components/category/category'
import HotTopic from './components/hot-topic/hot-topic'
import Content from './components/content/content'
import Api from './api'

export default {
  name: 'College',
  components: {
    'van-search': Search,
    'my-banner': Banner,
    'my-category': Category,
    'my-hot-topic': HotTopic,
    'my-content': Content,
  },
  data() {
    return {
      bannerList: [],
      searchVal: '',
      category: [],
      topics: [],
      tabList: [],
    }
  },
  mounted() {
    this.getCategory()
    this.getCollegeList()
    this.getBanner()
    this.getTabs()
    this.getHotTopic()
  },
  methods: {
    async getCategory() {
      const { data } = await Api.getCategory()
      this.category = data
    },
    async getCollegeList() {
      const { data } = await Api.getCollege()
      console.log(data)
    },
    async getBanner() {
      const { data } = await Api.getBanner()
      this.bannerList = data
    },
    async getTabs() {
      const { data } = await Api.getTabs()
      this.tabList = data
    },
    async getHotTopic() {
      const { data } = await Api.getHotTopic()
      this.topics = data
    },
  },
}
</script>

<style lang="less" scoped></style>
