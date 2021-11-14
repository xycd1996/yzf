<template>
  <div @click="onClick" class="picture-card">
    <div class="coverPath">
      <van-image height="220px" width="100%" fit="cover" :src="detail.image" lazy-load />
    </div>
    <div class="info">
      <div class="title">{{ detail.title }}</div>
      <div class="merchant">
        <img class="logo" :src="detail.authorHeadImage" />
        <div class="span">{{ detail.authorName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant'

export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    'van-image': Image
  },
  methods: {
    onClick() {
      this.$router.push(`/college/picture-detail/${this.detail.id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.picture-card {
  width: 100%;
  height: 300px;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 2px 2px 10px #ddd;
  box-sizing: border-box;
  .info {
    padding: 8px;
    .title {
      font-size: 16px;
      font-weight: 500;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .merchant {
      margin-top: 4px;
      display: flex;
      align-items: center;
      .logo {
        margin-right: 6px;
        border-radius: 50%;
        width: 28px;
        height: 28px;
      }
    }
  }
}
</style>
