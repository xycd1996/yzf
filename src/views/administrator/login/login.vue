<template>
  <div class="admin-login">
    <div class="title">核销后台登录</div>
    <div class="form">
      <van-form @submit="onFinish">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <div class="button">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Button, Field, Form } from 'vant'
import AdminApi from '@api/administrator'

export default {
  name: 'AdminLogin',
  components: {
    'van-form': Form,
    'van-field': Field,
    'van-button': Button
  },
  data() {
    return {
      password: '',
      username: ''
    }
  },
  methods: {
    async onFinish(values) {
      await AdminApi.login(values)
      this.$router.push({ name: 'AdminShopList' })
    }
  }
}
</script>

<style lang="less" scoped>
.admin-login {
  display: flex;
  height: 80vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    padding: 10px;
    font-size: 20px;
  }
  .form {
    width: 100%;
    .button {
      margin-top: 20px;
      padding: 0 16px;
    }
  }
}
</style>
