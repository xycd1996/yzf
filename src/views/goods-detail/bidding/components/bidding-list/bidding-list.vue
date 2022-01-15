<template>
  <div class="bidding-list">
    <ul class="container">
      <li v-for="(item, index) in list" :key="item.id" class="item">
        <img class="avatar" src="https://qnm.hunliji.com/FmpGVkSsayZEy5T_oMVU0yfr7Cr6" />
        <div class="userInfo">
          <div class="top">
            <span class="name">{{ item.title }}</span>
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
      <van-button type="danger" block size="small">查看更多</van-button>
      <van-button type="danger" block size="small">更新出价</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Tag } from 'vant'
import Api from '../../api'

export default {
  components: {
    'van-tag': Tag,
    'van-button': Button
  },
  data() {
    return {
      list: []
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
    async _queryRecordList() {
      const id = this.$route.params.id
      const { data } = await Api.getBiddingRecordList({ id })
      this.list = data.data
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
