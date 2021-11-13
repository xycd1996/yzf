<template>
  <div class="category-page">
    <my-header />
    <div class="search">
      <van-search placeholder="请输入搜索关键词" v-model="searchVal" />
    </div>
    <my-content />
  </div>
</template>

<script>
import { Search } from 'vant'
import Header from './components/header/header.vue'
import Content from './components/content/content.vue'

export default {
  components: {
    'my-header': Header,
    'van-search': Search,
    'my-content': Content
  },
  data() {
    return {
      searchVal: ''
    }
  }
}
</script>

<style lang="less" scoped></style>
