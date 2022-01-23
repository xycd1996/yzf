<template>
  <div class="film-factory-list">
    <van-nav-bar left-arrow @click-left="$router.back()" title="制片厂列表" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.userid" :value="item.type_identifier" :title="item.type_identifier_name" />
    </van-list>
  </div>
</template>

<script>
import { Cell, List, NavBar } from 'vant'
import Api from '../api'

export default {
  components: {
    'van-nav-bar': NavBar,
    'van-cell': Cell,
    'van-list': List
  },
  data() {
    return {
      page: 1,
      pageSize: 20,
      loading: false,
      finished: false,
      list: []
    }
  },
  methods: {
    async onLoad() {
      if (this.finished) {
        return
      }
      this.loading = true
      const { data } = await Api.getList({ page: this.page, pagesize: this.pageSize })
      this.list = this.list.concat(data.items)
      this.loading = false
      this.page++
      data.items.length < this.pageSize && (this.finished = true)
    }
  }
}
</script>

<style lang="less" scoped></style>
