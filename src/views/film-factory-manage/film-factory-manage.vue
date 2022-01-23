<template>
  <div class="film-factory-manage">
    <div class="header">
      <div class="avatar">
        <img class="path" src="https://qnm.hunliji.com/o_1fq0bsicj1ri61c4u1m586nq1mqp9.png" />
      </div>
      <div class="info">
        <div class="title">古镇制片厂</div>
        <div class="action">
          <van-button type="danger" size="small" class="edit">编辑制片厂管理</van-button>
          <van-button type="danger" size="small" class="publish">发布公告</van-button>
          <van-button type="danger" size="small" block class="tip">今日制片厂内新增短视频19条</van-button>
        </div>
      </div>
    </div>
    <div class="statistics">
      <div class="wrapper">
        <div class="user">
          <span>16/30</span>
          <span>成员情况</span>
        </div>
        <div class="vip">
          <span>16</span>
          <span>会员申请</span>
        </div>
        <div class="count-work">
          <span>138</span>
          <span>总作品</span>
        </div>
        <div class="point-wallet">
          <span>积分钱包</span>
        </div>
      </div>
    </div>
    <div class="banner">
      <img class="path" src="https://qnm.hunliji.com/o_1fq0bsicj1ri61c4u1m586nq1mqp9.png" />
    </div>
    <van-tabs v-model="tabActive">
      <van-tab title="会员情况"><my-account /></van-tab>
      <van-tab title="视频情况"><my-video /></van-tab>
      <van-tab title="制片厂会员数据">12</van-tab>
      <van-tab title="制片厂排行">排行</van-tab>
      <van-tab title="公告">公告</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Button, Tab, Tabs } from 'vant'
import Account from './components/account/account.vue'
import Video from './components/video/video.vue'

export default {
  components: {
    'van-button': Button,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'my-account': Account,
    'my-video': Video
  },
  data() {
    return {
      tabActive: 2
    }
  }
}
</script>

<style lang="less" scoped>
.film-factory-manage {
  .header {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .avatar {
      margin-right: 20px;
      width: 80px;
      height: 80px;
      .path {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .info {
      .title {
        margin-bottom: 4px;
        font-size: 18px;
        font-weight: 500;
      }
      .action {
        > button {
          margin: 0 8px 8px 0;
        }
      }
    }
  }
  .statistics {
    padding: 0 10px;
    margin-bottom: 10px;
    .wrapper {
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      height: 60px;
      color: #fff;
      background: #d43229;
      border-radius: 8px;
      > div {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }
  }
  .banner {
    width: 100%;
    height: 120px;
    .path {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
