<template>
  <div class="customer-chat">
    <my-header :onRefresh="onRefresh" />
    <my-list ref="myList" />
    <reply-area :onSendMessage="onSendMessage" />
  </div>
</template>

<script>
import Header from './header/header'
import ReplyArea from './reply-area/reply-area'
import List from './list/list'

export default {
  components: {
    'my-header': Header,
    'reply-area': ReplyArea,
    'my-list': List
  },
  methods: {
    onRefresh() {
      this.$refs.myList && this.$refs.myList.onRefresh()
    },
    onSendMessage(content) {
      this.$refs.myList && this.$refs.myList.sendMessage(content)
    }
  }
}
</script>

<style lang="less" scoped></style>
