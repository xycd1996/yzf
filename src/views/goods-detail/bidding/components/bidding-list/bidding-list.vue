<template>
  <div class="bidding-list">
    <ul class="container">
      <li v-for="(item, index) in list" :key="item.id" class="item">
        <img class="avatar" src="https://qnm.hunliji.com/FmpGVkSsayZEy5T_oMVU0yfr7Cr6" />
        <div class="userInfo">
          <div class="top">
            <span class="name">{{ item.nickname }}</span>
            <van-tag v-if="!index" plain type="danger">领先</van-tag>
          </div>
          <div class="bottom">
            <div class="integral">
              <span class="price">￥{{ item.price }}</span>
            </div>
            <div class="date">{{ item.pay_time }}</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="action">
      <van-button @click="onMore" type="danger" block size="small">查看更多</van-button>
      <!-- <van-button type="danger" block size="small">更新出价</van-button> -->
    </div>
    <van-popup v-model="moreShow" style="height: 80vh" closeable position="bottom">
      <van-list
        class="allList"
        @load="onLoad"
        finished-text="没有更多了"
        v-model="allListLoading"
        :finished="allListFinished"
      >
        <van-cell class="item" v-for="item in allList" :key="item.id">
          <img class="avatar" src="https://qnm.hunliji.com/FmpGVkSsayZEy5T_oMVU0yfr7Cr6" />
          <div class="userInfo">
            <div class="top">
              <span class="name">{{ item.nickname }}</span>
              <van-tag v-if="!index" plain type="danger">领先</van-tag>
            </div>
            <div class="bottom">
              <div class="integral">
                <span class="price">￥{{ item.price }}</span>
              </div>
              <div class="date">{{ item.pay_time }}</div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
import { Button, Tag, Popup, List } from 'vant'
import Api from '../../api'

export default {
  components: {
    'van-tag': Tag,
    'van-button': Button,
    'van-popup': Popup,
    'van-list': List
  },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      finished: false,
      allList: [],
      moreShow: false,
      allListLoading: false,
      allListFinished: false
    }
  },
  mounted() {
    this._queryRecordList()
    this.timer = setInterval(() => {
      this._queryRecordList()
    }, 5000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    onMore() {
      this.moreShow = true
    },
    async _queryRecordList() {
      const id = this.$route.params.id
      const { data } = await Api.getBiddingRecordList({ id })
      this.list = data.list
    },
    async onLoad() {
      this.allListLoading = true
      const id = this.$route.params.id
      const { data } = await Api.getBiddingRecordList({ id, page: this.page, pageSize: this.pageSize })
      this.allListLoading = false
      this.allList = this.allList.concat(data.data)
      if (data.data.length < this.pageSize) {
        this.allListFinished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@assets/less/theme';

.bidding-list {
  padding: 1.2rem 1.6rem;
  margin: 10px 0;
  background: #fff;
  .allList {
    padding: 40px 10px 20px;
  }
  .allList,
  .container {
    .item {
      margin: 10px 0;
      display: flex;
      align-items: center;
      .avatar {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
      }
      .userInfo {
        flex: 1 1 auto;
        margin-left: 10px;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .name {
            font-size: @medium-font-size;
            font-weight: 500;
          }
        }
        .bottom {
          margin-top: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: @less-font-size;
          color: @desc-color;
        }
      }
    }
  }
  .action {
    display: flex;
    .van-button {
      margin-right: 4px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
