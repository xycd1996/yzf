<template>
  <div class="film-factory-list">
    <van-nav-bar title="制片厂列表" />
  </div>
</template>

<script>
import { NavBar } from 'vant'
import Api from '../api'
export default {
  components: {
    'van-nav-bar': NavBar
  },
  data() {
    return {
      page: 1,
      pageSize: 20
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data } = await Api.getList({ page: this.page, pageSize: this.pageSize })
      console.log('data: ', data)
    }
  }
}
</script>

<style lang="less" scoped></style>
