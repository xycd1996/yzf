<template>
  <div class="check-off">
    <van-nav-bar left-text="返回" title="店铺核销" @click-left="onClickLeft" />
    <div class="user-info">
      <div class="avatar">
        <img src="https://qnm.hunliji.com/o_1fcgjl0a713in1n4dorhqfh1tvr9.jpg" />
      </div>
      <div class="username">
        用户名
      </div>
    </div>
    <div class="check-action">
      <div @click="onInputCheck" class="input">
        <van-icon size="38px" name="edit" />
        <span>输入验证</span>
      </div>
      <van-dialog
        @open="openCheckInput"
        @confirm="onCheckInputConfirm"
        v-model="checkInputShow"
        show-cancel-button
        title="输入核销码"
      >
        <van-field v-model="checkInputValue" ref="inputRef" placeholder="请输入用户核销码" />
      </van-dialog>
      <div class="qrcode">
        <van-icon size="38px" name="scan" />
        <span>扫码验证</span>
      </div>
      <div class="record">
        <van-icon size="38px" name="records" />
        <span>核销记录</span>
      </div>
    </div>
    <div class="operating-data"></div>
  </div>
</template>

<script>
import { Dialog, Field, Icon, NavBar, Toast } from 'vant'

export default {
  name: 'AdminCheckOff',
  components: {
    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-dialog': Dialog.Component,
    'van-field': Field
  },
  data() {
    return {
      checkInputShow: false,
      checkInputValue: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onInputCheck() {
      this.checkInputShow = true
      this.$nextTick(() => {
        this.$refs.inputRef.focus()
      })
    },
    openCheckInput() {
      this.checkInputValue = ''
    },
    onCheckInputConfirm() {
      console.log(this.checkInputValue)
      if (!this.checkInputValue) {
        return Toast.fail('无效核销码')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.check-off {
  .user-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 200px;
    background: #fff;
    .avatar {
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .username {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .check-action {
    margin-top: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    .input,
    .qrcode,
    .record {
      width: 100%;
      margin: 0 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100px;
      font-size: 14px;
      background: #fff;
      span {
        margin-top: 6px;
      }
    }
  }
}
</style>
