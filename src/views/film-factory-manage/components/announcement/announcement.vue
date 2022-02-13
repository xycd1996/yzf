<template>
  <div class="announcement">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div @click="onClick(item.id)" class="item" v-for="item in list" :key="item.id">
        <van-image :src="item.image" class="image" />
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.description }}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { List, Image } from 'vant'
import Api from '../../api'

export default {
  components: {
    'van-list': List,
    'van-image': Image
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      pageSize: 10
    }
  },
  methods: {
    async onLoad() {
      this.loading = true
      const { data } = await Api.getNoticeList({
        type: 1,
        page: this.page
      })
      this.list = this.list.concat(data.items)
      this.loading = false
      this.page++
      if (!data.items.length) {
        this.finished = true
      }
    },
    onClick(id) {
      this.$router.push(`picture-detail/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.announcement {
  min-height: 200px;

  .item {
    padding: 6px 8px;
    display: flex;
    align-content: center;
    border-bottom: 1px solid #ccc;
    margin: 10px;
    background: #fff;
    .image {
      margin-right: 10px;
      width: 60px;
      height: 60px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}
</style>
