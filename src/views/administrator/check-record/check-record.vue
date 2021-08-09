<template>
  <div class="check-record">
    <van-nav-bar
      placeholder
      safe-area-inset-top
      title="核销记录"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @refresh="onRefresh"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="record in list"
          :title="record.product_title"
          :label="`￥${record.price}`"
          :key="record.id"
        >
          <div>核销员：{{ record.checker_name }}</div>
          <div>{{ record.check_time }}</div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import AdminApi from '@api/administrator'
import { Cell, List, NavBar, PullRefresh } from 'vant'

const PAGE_SIZE = 15

export default {
  components: {
    'van-nav-bar': NavBar,
    'van-list': List,
    'van-cell': Cell,
    'van-pull-refresh': PullRefresh
  },
  data() {
    return {
      list: [],
      page: 1,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    onLoad() {
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
      }
      this.getList()
    },
    onRefresh() {
      this.loading = true
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    async getList() {
      const { data } = await AdminApi.recordList({
        page: this.page,
        pagesize: PAGE_SIZE,
        cate_id: 0,
        shop_id: this.$route.params.shopId,
        begin_date: '2021-08-01',
        end_date: '2021-08-11'
      })
      this.list = this.list.concat(data.data)
      this.loading = false
      if (data.data?.length < PAGE_SIZE) {
        this.finished = true
      }
    },
    onClickLeft() {
      this.$router.push({
        name: 'AdminCheckOff',
        params: {
          shopId: this.$route.params.shopId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
