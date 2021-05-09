<template>
  <div class="reply-area">
    <div class="container">
      <van-filed maxlength="300" v-model="replyContent" type="textarea" placeholder="请输入发送内容" rows="4" />
      <van-button @click="onSend" class="send" type="info" size="small">发送</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Field, Toast } from 'vant'
import customerChatApi from '@api/customer-chat'

export default {
  props: {
    onSendMessage: Function
  },
  components: {
    'van-button': Button,
    'van-filed': Field
  },
  data() {
    return {
      replyContent: ''
    }
  },
  methods: {
    async onSend() {
      if (!this.replyContent) {
        return Toast.fail('发送内容不能为空')
      }
      const id = this.$route.params.id
      await customerChatApi.send({
        from_shop_id: id,
        content: this.replyContent
      })
      Toast({
        message: '已发送',
        position: 'bottom'
      })
      this.onSendMessage && this.onSendMessage(this.replyContent)
      this.replyContent = ''
    }
  }
}
</script>

<style lang="less" scoped>
.reply-area {
  position: fixed;
  bottom: 0;
  width: 100%;
  .container {
    position: relative;
    height: 120px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #ddd;
    box-shadow: 10px 8px 8px 10px #ddd;
    .send {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}
</style>
