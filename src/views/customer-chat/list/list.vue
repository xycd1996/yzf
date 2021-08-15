<template>
  <div class="list">
    <van-list
      v-model="loading"
      finished-text="没有更多了"
      :finished="finished"
      :immediate-check="false"
      direction="up"
      @load="getList"
      :offset="300"
    >
      <ul class="chat-content">
        <li class="safe-warning" v-if="$route.query.safeWarning && !messageList.length">
          <div class="title">安全交易提醒</div>
          <div class="desc">
            为了确保您的积分及资金安全，请遵守易视智富二手物品交易规范，一定要在平台内完成支付。
          </div>
          <div class="more">了解易视智富二手物品交易规范条例</div>
        </li>
        <li v-for="item in messageList" :key="item.id" class="chat-item">
          <div v-if="item.type === 1" class="user">
            <img class="avatar" :src="require('@assets/img/user_avatar.svg')" />
            <div class="content">{{ item.content }}</div>
          </div>
          <div v-else class="service">
            <img class="avatar" :src="require('@assets/img/service_avatar.svg')" />
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { List } from 'vant'
import customerChatApi from '@api/customer-chat'

const PAGE_SIZE = 20

export default {
  components: {
    'van-list': List
  },
  data() {
    return {
      page: 1,
      loading: false,
      finished: false,
      messageList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    onRefresh() {
      this.page = 1
      this.messageList = []
      this.finished = false
      this.loading = true
      this.getList()
    },
    sendMessage(content) {
      this.messageList.push({
        id: this.messageList[this.messageList.length - 1].id + 1,
        content,
        type: 1
      })
      this.$nextTick(() => {
        window.scrollTo(0, 99999)
      })
    },
    async getList() {
      const id = this.$route.params.id
      const { data } = await customerChatApi.list({
        from_shop_id: id,
        page: this.page,
        pagesize: PAGE_SIZE
      })

      this.loading = false
      if (data?.items?.length < PAGE_SIZE) {
        this.finished = true
      }
      this.messageList.unshift(...data.items.reverse())
      if (this.page === 1) {
        this.$nextTick(() => {
          window.scrollTo(0, 99999)
        })
      }
      this.page++
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  margin-bottom: 120px;
  .chat-content {
    padding: 0 1rem;
    .safe-warning {
      margin-top: 10px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #eee;
      border: 1px solid #ccc;
      .title {
        font-size: 1.6rem;
        font-weight: 600;
        color: red;
      }
      .desc {
        margin: 8px 0;
        line-height: 18px;
        text-align: center;
      }
      .more {
        padding-top: 8px;
        font-size: 1.4rem;
        font-weight: 600;
        color: #000;
        border-top: 1px solid #ccc;
      }
    }
    .chat-item {
      min-height: 100px;
      .user,
      .service {
        .content {
          margin: 0 18px;
          padding: 10px;
          background: #fff;
          border-radius: 4px;
        }
        .avatar {
          padding: 4px;
          width: 3rem;
          height: 3rem;
          border: 1px solid #ccc;
          border-radius: 50%;
          background: #fff;
        }
      }
      .user {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        .content {
          position: relative;
        }
        .content::before {
          position: absolute;
          left: -16px;
          content: '';
          border: 8px solid transparent;
          border-right: 8px solid #fff;
          background: transparent;
        }
      }
      .service {
        display: flex;
        align-items: center;
        .content {
          position: relative;
        }
        .content::after {
          position: absolute;
          right: -16px;
          content: '';
          border: 8px solid transparent;
          border-left: 8px solid #fff;
          background: transparent;
        }
      }
    }
  }
}
</style>
