<template>
  <div class="video-card">
    <div class="bk">
      <van-image
        fit="cover"
        height="280px"
        width="100%"
        src="https://qnm.hunliji.com/o_1fk2lnu1d1k9hf8s37m1ml611jne.webp"
      />
    </div>
    <div class="info">
      <div class="video-info">
        <div class="title">视频标题</div>
        <div class="description">视频描述描述视频描述描述</div>
      </div>
      <van-image
        class="avatar"
        lazy-load
        round
        width="32px"
        height="32px"
        src="https://qnm.hunliji.com/o_1fk2hhnb9kuvhgr9b611khjp9.jpg"
      />
    </div>
  </div>
</template>

<script>
import { Image } from 'vant'

export default {
  components: {
    'van-image': Image
  }
}
</script>

<style lang="less" scoped>
.video-card {
  width: 100%;
  height: 320px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .bk {
    position: absolute;
    top: 0;
    width: 100%;
  }
  .info {
    padding: 30px 8px 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.65));
    .avatar {
      flex: 0 0 32px;
      width: 32px;
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
</style>
