<template>
  <div class="college">
    <my-banner objectFit="cover" :bannerList="bannerList" />
    <div class="search">
      <van-search v-model="searchVal" placeholder="请输入搜索关键词" />
    </div>
    <my-category :category="category" />
    <my-hot-topic :topics="topics" />
    <my-content :tabList="tabList" />
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
      bannerList: [
        { photo: 'https://qnm.hunliji.com/o_1fjsrhlfhtpe7itbgjko43lj.jpg' },
        {
          photo: 'https://qnm.hunliji.com/o_1fjsrgiat1n4v15f82ehhg11gkd9.jpg',
        },
        {
          photo: 'https://qnm.hunliji.com/o_1fjsrjdbh1u5417ib9ll1lq41au3o.jpg',
        },
      ],
      searchVal: '',
      category: [],
      topics: [
        {
          title: '梵净山',
          coverPath: 'https://qnm.hunliji.com/o_1fjss3fe0p4riapg7dfsenlrd.webp',
        },
        {
          title: '好物推荐',
          coverPath: 'https://qnm.hunliji.com/o_1fjss3fe01jg41q1s1dn2rce155gb.jpg',
        },
        {
          title: '扶贫心声',
          coverPath: 'https://qnm.hunliji.com/o_1fjss3fe01jb0tm41bk5bsr14nrc.webp',
        },
        {
          title: '名族风情',
          coverPath: 'https://qnm.hunliji.com/o_1fjss3fe0p4riapg7dfsenlrd.webp',
        },
        {
          title: '说天说地',
          coverPath: 'https://qnm.hunliji.com/o_1fjss3fe01jg41q1s1dn2rce155gb.jpg',
        },
      ],
      tabList: [
        { title: '优秀创作者' },
        { title: '优秀视频' },
        { title: '推荐教程' },
        { title: '平台入门' },
        { title: '平台政策' },
      ],
    }
  },
  mounted() {
    this.getCategory()
    this.getCollegeList()
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
  },
}
</script>

<style lang="less" scoped></style>
