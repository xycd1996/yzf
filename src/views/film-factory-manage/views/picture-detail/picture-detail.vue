<template>
  <page-loading :loading="loading">
    <van-nav-bar title="图文详情" left-arrow @click-left="$router.back()" />
    <div class="picture-detail">
      <div class="title">
        {{ detail.title }}
      </div>
      <div class="create-time">发布时间：{{ detail.create_time }}</div>
      <van-divider />
      <div class="content" v-html="detail.content" />
    </div>
  </page-loading>
</template>

<script>
import { Divider, NavBar } from 'vant'
import Api from '../../api'
import PageLoading from '@/components/page-loading/page-loading.vue'

export default {
  components: {
    'van-divider': Divider,
    'van-nav-bar': NavBar,
    'page-loading': PageLoading
  },
  data() {
    return {
      detail: {},
      loading: true
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const id = this.$route.params.id
      const { data } = await Api.getNoticeDetail({ id })
      this.detail = data
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.picture-detail {
  padding: 8px 12px;
  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
  .create-time {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
