<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="film-factory-manage">
      <div @click="qrcodeShow = true" class="share">
        <van-icon size="22" color="red" name="share" />
      </div>
      <van-dialog v-model="qrcodeShow" title="分享邀请码">
        <div class="qrcode">
          <qr-code size="160" :value="info.type_identifier"></qr-code>
          <span>邀请码：{{ info.type_identifier }}</span>
        </div>
      </van-dialog>
      <van-dialog showCancelButton @confirm="confirm" @cancel="cancel" v-model="editShow" title="编辑资料">
        <van-field maxlength="10" v-model="name" placeholder="请输入" label="制片厂名称" />
      </van-dialog>
      <div class="header">
        <div class="avatar">
          <van-image class="path" :src="info.imgHost" />
        </div>
        <div class="info">
          <div class="title">{{ info.type_identifier_name }}</div>
          <div class="action">
            <van-button type="danger" size="small" @click="editShow = true" class="edit">编辑制片厂资料</van-button>
            <van-button type="danger" size="small" @click="$router.push('publish')" class="publish"
              >发布公告</van-button
            >
            <van-button type="danger" size="small" block class="tip"
              >今日制片厂内新增短视频{{ info.zpcData.todayVideo }}条</van-button
            >
          </div>
        </div>
      </div>
      <div class="statistics">
        <div class="wrapper">
          <div class="user">
            <span>{{ info.zpcData.nowMember }}/{{ info.zpcData.maxMember }}</span>
            <span>成员情况</span>
          </div>
          <div class="vip">
            <span>{{ info.zpcData.applyMember }}</span>
            <span>会员申请</span>
          </div>
          <div class="count-work">
            <span>{{ info.zpcData.totalVideo }}</span>
            <span>总作品</span>
          </div>
          <div class="pending">
            <span>{{ info.zpcData.waitMember }}</span>
            <span>待审核</span>
          </div>
          <div class="point-wallet">
            <span>积分钱包</span>
          </div>
        </div>
      </div>
      <div v-if="info.ads" @click="window.href = info.ads.jumpUrl" class="banner">
        <van-image cover class="path" :src="info.ads.images" />
      </div>
      <van-tabs v-if="!loading" :ellipsis="false" v-model="tabActive">
        <van-tab title="会员情况"><my-account /></van-tab>
        <van-tab title="视频情况"><my-video /></van-tab>
        <van-tab title="制片厂会员数据"><my-total /></van-tab>
        <van-tab title="制片厂排行"><my-ranking /></van-tab>
        <van-tab title="公告"><my-announcement /></van-tab>
      </van-tabs>
    </div>
  </van-pull-refresh>
</template>

<script>
import { Button, Tab, Tabs, PullRefresh, Dialog, Field, Toast, Icon, Image } from 'vant'
import Account from '../../components/account/account.vue'
import Video from '../../components/video/video.vue'
import Total from '../../components/total/total.vue'
import Ranking from '../../components/ranking/ranking.vue'
import Announcement from '../../components/announcement/announcement.vue'
import QRCode from 'qrcode.vue'
import Api from '../../api'

export default {
  components: {
    'van-button': Button,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'my-account': Account,
    'my-video': Video,
    'my-total': Total,
    'my-ranking': Ranking,
    'my-announcement': Announcement,
    'van-pull-refresh': PullRefresh,
    'van-dialog': Dialog.Component,
    'van-field': Field,
    'van-icon': Icon,
    'qr-code': QRCode,
    'van-image': Image
  },
  data() {
    return {
      tabActive: 0,
      loading: false,
      info: {
        zpcData: {}
      },
      editShow: false,
      name: '',
      qrcodeShow: false
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    async confirm() {
      await Api.editInfo({ type_identifier_name: this.name })
      Toast.success('保存成功')
      this.name = ''
      this.getInfo()
    },
    cancel() {
      this.name = ''
    },
    async getInfo() {
      const { data } = await Api.getInfo()
      this.info = data
    },
    async onRefresh() {
      this.loading = true
      await this.getInfo()
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.film-factory-manage {
  min-height: 100vh;
  position: relative;
  .qrcode {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .share {
    position: absolute;
    right: 10px;
    top: 10px;
  }
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
