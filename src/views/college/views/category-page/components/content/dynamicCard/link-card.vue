<template>
  <div class="link-card">
    <div class="coverPath">
      <van-image
        width="100%"
        height="100px"
        fit="cover"
        src="https://qnm.hunliji.com/o_1fkcv2e1f1kot1jhc120i1i6b1hh5e.jpeg"
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
.link-card {
  height: 168px;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  .coverPath {
    height: 100px;
  }
  .info {
    padding: 0 8px;
    height: 68px;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
