<template>
  <div class="account">
    <van-list finished-text="已经到底了" v-model="loading" :finished="finished" @load="onLoad">
      <ul class="wrapper">
        <li class="item" v-for="item in list" :key="item.userid">
          <div class="avatar">
            <img class="path" :src="imgHost + item.headimg" />
            <div class="level">L{{ item.level }}</div>
          </div>
          <div class="user-info">
            <div class="username">{{ item.nickname }}</div>
          </div>
          <div class="action">
            <div style="margin-bottom: 6px;">
              <van-button @click="getUserInfo(item.userid)" type="danger" size="mini">
                查看资料
              </van-button>
            </div>
            <div>
              <van-button @click="openUserHome(item.userid)" type="danger" size="mini">
                个人主页
              </van-button>
            </div>
          </div>
        </li>
      </ul>
    </van-list>
    <van-popup round closeable position="bottom" style="height: 50%" v-model="userShow">
      <div class="user-detail">
        <div class="video">视频量：{{ userInfo.videos }}</div>
        <div class="point">积分：{{ userInfo.integral }}</div>
        <div class="username">姓名：{{ userInfo.real_name }}</div>
        <div class="referee">推荐人：{{ userInfo.invite_user_name }}</div>
        <div class="factory">制片厂：{{ userInfo.nickname }}</div>
        <div class="createTime">注册时间：{{ userInfo.address }}</div>
        <div class="address">注册地址：{{ formatDate(userInfo.reg_time) }}</div>
        <van-button type="danger" style="margin-top: 20px" block @click="removeFactory(userInfo.userid)"
          >移出制片厂</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Button, Dialog, List, Popup, Toast } from 'vant'
import Api from '../../api'
import { openUserHomePage } from '@/utils/jsBridge'
import dayjs from 'dayjs'

export default {
  components: {
    'van-button': Button,
    'van-popup': Popup,
    'van-list': List
  },
  data() {
    return {
      list: [],
      imgHost: '',
      userShow: false,
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20,
      userInfo: {}
    }
  },
  methods: {
    formatDate(timestamp) {
      return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    async onLoad() {
      if (this.finished) {
        return
      }
      this.loading = true
      const { data } = await Api.getAccountList({
        page: this.page,
        pagesize: this.pageSize
      })
      this.loading = false
      this.list = this.list.concat(data.items)
      this.page++
      !this.imgHost && (this.imgHost = data.imgHost)
      if (data.items.length < this.pageSize) {
        this.finished = true
      }
    },
    async getUserInfo(userId) {
      this.userShow = true
      const { data } = await Api.getAccountDetail({ id_author: userId })
      this.userInfo = data.info
    },
    removeFactory(userId) {
      Dialog.confirm({
        title: '确认是否移出？',
        showCancelButton: true
      }).then(async () => {
        await Api.removeAccount({ remove_userid: userId })
        Toast.success('移除成功')
        this.userShow = false
        this.refreshList()
      })
    },
    refreshList() {
      this.page = 1
      this.finished = false
      this.list = []
      this.onLoad()
    },
    openUserHome(userid) {
      openUserHomePage(userid)
    }
  }
}
</script>

<style lang="less" scoped>
.account {
  .wrapper {
    padding: 8px 10px;
    .item {
      padding: 18px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .avatar {
        margin-right: 18px;
        position: relative;
        width: 58px;
        height: 58px;
        .path {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid #ccc;
          object-fit: cover;
        }
        .level {
          position: absolute;
          bottom: 0;
          right: -4px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          color: #fff;
          background: red;
          border-radius: 50%;
          border: 1px solid #fff;
        }
      }
      .user-info {
        flex: 1 1 auto;
        font-size: 14px;
        .username {
          margin-bottom: 6px;
          font-size: 16px;
          color: #000;
          font-weight: 500;
        }
      }
      .action {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
      }
    }
  }
  .user-detail {
    padding: 40px 10px;
    line-height: 24px;
    font-size: 16px;
  }
}
</style>
