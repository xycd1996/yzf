<template>
  <div class="publish">
    <van-nav-bar title="发布公告" left-arrow @click-left="onBack" />
    <div class="content">
      <van-field placeholder="请输入标题" v-model="title" maxlength="30" required label="标题" />
      <van-field
        label="内容"
        :autosize="{ minHeight: 200, maxHeight: 200 }"
        v-model="content"
        show-word-limit
        maxlength="300"
        required
        clearable
        type="textarea"
        placeholder="请输入要发布的公告"
      />
      <van-button type="danger" @click="onPublish" block>发布</van-button>
      <a class="record">发布历史记录</a>
    </div>
  </div>
</template>

<script>
import { Button, Field, NavBar, Toast } from 'vant'
import Api from '../../api'

export default {
  components: {
    'van-nav-bar': NavBar,
    'van-field': Field,
    'van-button': Button
  },
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    onBack() {
      this.$router.back()
    },
    async onPublish() {
      if (!this.title || !this.content) {
        return Toast.fail('标题和内容不能为空')
      }
      Toast.loading({
        message: '正在发布中',
        mask: true
      })
      await Api.createPublish({ title: this.title, description: this.content })
      Toast.success('发布成功')
      this.title = ''
      this.content = ''
    }
  }
}
</script>

<style lang="less" scoped>
.publish {
  .content {
    padding: 10px;
    .record {
      display: inline-block;
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
