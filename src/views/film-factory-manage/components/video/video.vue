<template>
  <div class="video">
    <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="已经到底了">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="wrapper">
          <div class="bk">
            <img width="100%" height="100%" :src="imgHost + item.photo_index" class="videoPath" />
          </div>
          <div class="info">
            <div class="title">{{ item.text_title }}</div>
            <div class="desc">{{ item.text_description }}</div>
          </div>
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
      list: [],
      imgHost: ''
    }
  },
  methods: {
    async onLoad() {
      this.loading = true
      const { data } = await Api.getVideoList({ page: this.page, pagesize: this.pageSize })
      this.list = this.list.concat(data.items)
      this.page++
      this.loading = false
      !this.imgHost && (this.imgHost = data.imgHost)
      data.items.length < this.pageSize && (this.finished = true)
    }
  }
}
</script>

<style lang="less" scoped>
.video {
  .item {
    padding: 8px;
    box-sizing: border-box;
    width: 50%;
    .wrapper {
      position: relative;
      .bk {
        height: 280px;
        .videoPath {
          object-fit: cover;
        }
      }
      .info {
        padding: 10px;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 68px;
        background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2));
        .title {
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .desc {
          font-size: 14px;
          color: #f1f1f1;
        }
      }
    }
  }
}
</style>
