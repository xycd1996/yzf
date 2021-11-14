<template>
  <div class="user-list">
    <van-list finished-text="没有更多了" v-model="loading" :finished="finished" @load="onLoad">
      <div class="container" v-for="item in list" :key="item.userid">
        <div v-if="item.videos" class="left">
          <div
            v-for="(video, index) in sliceVideoImages(item.videos)"
            :key="index"
            @click="openVideo(item.userid, index)"
            :class="`video-item video-item-${index + 1}`"
          >
            <van-image width="100%" height="100%" lazy-load fit="cover" :src="imageHost + video.photo_index">
              <template #error>
                <van-image fit="cover" width="60" :src="require('@assets/img/avatar_error.png')" />
              </template>
            </van-image>
          </div>
        </div>
        <div class="right">
          <van-image
            @click="onPreview(imageHost + item.headimg)"
            class="avatar"
            lazy-load
            round
            width="50"
            height="50"
            fit="cover"
            :src="imageHost + item.headimg"
          >
            <template #error>
              <van-image fit="cover" :src="require('@assets/img/avatar_error.png')" />
            </template>
          </van-image>
          <div class="userName">
            {{ item.nickname }}
          </div>
          <button @click="onClickUser(item.userid)" class="follow">访问主页</button>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { Image, ImagePreview, List } from 'vant'
import Api from '../../../api'
import { openUserHomePage, openVideoList } from '@/utils/jsBridge'
import slice from 'lodash/slice'

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
      pageSize: 10,
      imageHost: ''
    }
  },
  methods: {
    async onLoad() {
      const { data } = await Api.getList({ cate_id: this.active, page: this.page, pagesize: this.pageSize })
      this.list = this.list.concat(data.items)
      this.imageHost = data.imgHost
      this.page++
      this.loading = false
      if (data.items.length < this.pageSize) {
        this.finished = true
      }
    },
    onClickUser(userId) {
      openUserHomePage(userId)
    },
    sliceVideoImages(images) {
      const ret = slice(images, 0, 3)
      if (ret.length < 3) {
        return ret.concat(Array(3 - ret.length).fill(''))
      }
      return ret
    },
    onPreview(img) {
      ImagePreview({
        images: [img],
        showIndex: false
      })
    },
    openVideo(userId, index) {
      openVideoList(`/tsShop/addons.short_video_school/articleDetail/id/${this.active}`, index, userId)
    }
  }
}
</script>

<style lang="less" scoped>
.user-list {
  padding: 10px;
  .container {
    position: relative;
    margin-top: 48px;
    display: flex;
    align-items: center;
    height: 164px;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      position: absolute;
      top: -24px;
      background: #ddd;
    }
    &:first-child {
      margin-top: 0;
      &::after {
        height: 0;
      }
    }
    .left {
      flex: 1 1 75%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
      .video-item {
        display: flex;
      }
      .video-item-1 {
        grid-area: video-1;
      }
      .video-item-2 {
        grid-area: video-2;
      }
      .video-item-3 {
        grid-area: video-3;
      }
      display: grid;
      grid-auto-rows: 80px;
      grid-auto-columns: 80px;
      grid-template-areas:
        'video-1 video-1 video-2'
        'video-1 video-1 video-3';
      grid-gap: 4px;
    }
    .right {
      flex: 0 0 25%;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      .avatar {
        margin-bottom: 4px;
        border: 1px solid #ccc;
      }
      .userName {
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 600;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .follow {
        display: flex;
        align-items: center;
        padding: 4px 8px;
        font-weight: 500;
        font-size: 14px;
        color: #000;
        background: #f9cf4c;
        border: none;
        border-radius: 10px;
      }
    }
  }
}
</style>
