<template>
  <div class="video-list">
    <van-list finished-text="没有更多了" v-model="loading" :finished="finished" @load="onLoad">
      <ul class="container">
        <li class="item" @click="onClick(index, item.userid)" v-for="(item, index) in list" :key="item.id_video">
          <div class="bk" :style="`background-image: url(${imgHost + item.photo_index})`">
            <div class="info">
              <div class="video-info">
                <div class="title">{{ item.text_title }}</div>
                <div class="description">{{ item.text_description }}</div>
              </div>
              <van-image
                class="avatar"
                lazy-load
                fit="cover"
                round
                width="38"
                height="38"
                :src="imgHost + item.headimg"
              />
            </div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { Image, List } from 'vant'
import Api from '../../../api'
import { openVideoList } from '@/utils/jsBridge'

export default {
  props: {
    active: Number
  },
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
      pageSize: 20,
      imgHost: ''
    }
  },
  methods: {
    onClick(index, userId) {
      openVideoList('/addons.short_video_school/articleLists/type/2', index, userId)
    },
    async onLoad() {
      const { data } = await Api.getList({ cate_id: this.active, page: this.page, pagesize: this.pageSize })
      this.list = data.items
      this.imgHost = data.imgHost
      this.loading = false
      if (data.items.length < this.pageSize) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.video-list {
  .container {
    display: flex;
    padding: 0 5px;
    .item {
      flex: 0 0 50%;
      padding: 8px 5px;
      width: 50%;
      box-sizing: border-box;
      height: 320px;
      .bk {
        position: relative;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        border-radius: 6px;
        overflow: hidden;
        .info {
          padding: 20px 8px 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 0;
          width: 100%;
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.65));
          .avatar {
            flex: 0 0 38px;
            width: 38px;
          }
          .video-info {
            margin-right: 4px;
            flex: 1 1 auto;
            .title {
              font-size: 14px;
              font-weight: 600;
              color: #fff;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
            .description {
              font-size: 12px;
              color: #f1f1f1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
