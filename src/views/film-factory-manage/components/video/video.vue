<template>
  <div class="video">
    <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="已经到底了">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="bk">
          <img src="" class="videoPath" />
        </div>
        <div class="info">
          
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { List } from 'vant'
import Api from '../../api'

export default {
  components: {
    'van-list': List
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20,
      list: [1,2]
    }
  },
  methods: {
    async onLoad() {
      this.loading = true
      const { data } = await Api.getVideoList({ page: this.page, pagesize: this.pageSize })
      this.list = this.list.concat(data.items)
      this.page++
      this.loading = false
      data.items.length < this.pageSize && (this.finished = true)
    }
  }
}
</script>

<style lang="less" scoped>
.video {
}
</style>
