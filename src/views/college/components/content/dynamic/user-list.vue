<template>
  <div class="user-list">
    <van-list finished-text="没有更多了" v-model="loading" :finished="finished" @load="onLoad">
      <div class="container" v-for="item in list" :key="item.id">
        <div class="left">
          <van-image
            class="video-item video-item-1"
            lazy-load
            fit="cover"
            src="https://qnm.hunliji.com/o_1fk2i58tc1a31851t8vpvfnppg.jpg"
          />
          <van-image
            class="video-item video-item-2"
            lazy-load
            fit="cover"
            src="https://qnm.hunliji.com/o_1fk2i58tc1ogqtf31a5hgg6dggh.jpg"
          />
          <van-image
            class="video-item video-item-3"
            lazy-load
            fit="cover"
            src="https://qnm.hunliji.com/o_1fk2i58tc11s513hh1tcgq15rjii.jpg"
          />
        </div>
        <div class="right">
          <van-image
            class="avatar"
            lazy-load
            round
            width="50"
            height="50"
            src="https://qnm.hunliji.com/o_1fk2hhnb9kuvhgr9b611khjp9.jpg"
          />
          <div class="userName">
            用户名
          </div>
          <button class="follow"><van-icon size="12px" name="plus" /> 关注</button>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { Icon, Image, List } from 'vant'
import Api from '../../../api'

export default {
  props: {
    active: Number,
  },
  components: {
    'van-list': List,
    'van-image': Image,
    'van-icon': Icon,
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      pageSize: 20,
    }
  },
  methods: {
    async onLoad() {
      const { data } = await Api.getList({ cate_id: this.active, page: this.page, pagesize: this.pageSize })
      this.list = data.data
      this.loading = false
      if (data.data.length < this.pageSize) {
        this.finished = true
      }
    },
  },
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
    height: 160px;
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
        display: block;
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
