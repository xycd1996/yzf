<template>
  <div class="ranking">
    <van-tabs type="card" v-model="active">
      <van-tab title="积分排行" />
      <van-tab title="综合排行" />
      <van-tab title="视频量排行" />
    </van-tabs>
    <div class="list">
      <van-cell v-for="(item, index) in list" :key="index" :title="item.nickname" :value="getCount(item)" />
    </div>
  </div>
</template>

<script>
import { Cell, Tab, Tabs } from 'vant'
import Api from '../../api'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-cell': Cell
  },
  data() {
    return {
      list: [],
      active: 0
    }
  },
  mounted() {
    this.getRankingList()
  },
  methods: {
    getCount(detail) {
      if (this.active === 0) {
        return detail.integrals + '积分'
      } else if (this.active === 1) {
        return detail.score
      } else {
        return detail.videos + '量'
      }
    },
    async getRankingList() {
      const { data } = await Api.getRankingList({
        type: this.active
      })
      this.list = data
    }
  },
  watch: {
    active: function() {
      this.getRankingList()
    }
  }
}
</script>

<style lang="less" scoped>
.ranking {
  margin-top: 20px;
}
</style>
