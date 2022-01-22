<template>
  <div class="account">
    <ul class="wrapper">
      <li class="item" v-for="item in list" :key="item.id">
        <div class="avatar">
          <img class="path" src="https://qnm.hunliji.com/o_1fq0hoev910ac16i219qt1q591v209.jpeg" />
          <div class="level">L4</div>
        </div>
        <div class="user-info">
          <div class="username">方丹</div>
          <div class="work">
            <span class="video-count">视频量：23</span>
            <span class="point">积分：1.2万</span>
          </div>
        </div>
        <div class="action">
          <van-button type="danger" size="mini">
            查看资料
          </van-button>
          <van-button type="danger" size="mini">
            个人主页
          </van-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Button } from 'vant'

export default {
  components: {
    'van-button': Button
  },
  data() {
    return {
      list: [
        {
          id: 1
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.account {
  .wrapper {
    padding: 8px 10px;
    .item {
      padding-bottom: 18px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .avatar {
        margin-right: 18px;
        position: relative;
        width: 58px;
        height: 58px;
        .path {
          width: inherit;
          height: initial;
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
        .work {
          display: flex;
          align-items: center;
          .point {
            margin-left: 10px;
          }
        }
      }
      .action {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
