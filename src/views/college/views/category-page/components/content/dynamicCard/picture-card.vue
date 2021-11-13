<template>
  <div class="picture-card">
    <div class="coverPath">
      <van-image
        height="220px"
        width="100%"
        fit="cover"
        src="https://qnm.hunliji.com/o_1fkcv2e1f1kot1jhc120i1i6b1hh5e.jpeg"
        lazy-load
      />
    </div>
    <div class="info">
      <div class="title">文章标题标题标题标题</div>
      <div class="merchant">
        <img class="logo" src="https://qnm.hunliji.com/o_1fk2hhnb9kuvhgr9b611khjp9.jpg" />
        <div class="span">作者名称</div>
      </div>
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
