<template>
  <div class="check-off">
    <van-nav-bar
      placeholder
      safe-area-inset-top
      left-text="返回"
      :title="$route.query.shopName"
      @click-left="onClickLeft"
    />
    <div class="user-info">
      <div class="avatar">
        <img :src="$route.query.avatar" />
      </div>
      <div class="username">
        {{ $route.query.nickname }}
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
      <div @click="onQRCode" class="qrcode">
        <van-icon size="38px" name="scan" />
        <span>扫码验证</span>
      </div>
      <div @click="onRecord" class="record">
        <van-icon size="38px" name="records" />
        <span>核销记录</span>
      </div>
    </div>
    <div class="operating-data"></div>
  </div>
</template>

<script>
import { Dialog, Field, Icon, NavBar, Toast } from 'vant'
import AdminApi from '@api/administrator'

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
      this.$router.push({
        name: 'AdminShopList'
      })
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
    async onCheckInputConfirm() {
      if (!this.checkInputValue) {
        return Toast.fail('无效核销码')
      }
      await AdminApi.checkDetail({
        discount_no: this.checkInputValue
      })
      this.$router.push({
        name: 'AdminFallback',
        params: {
          code: this.checkInputValue
        }
      })
    },
    async checkQRCode(code) {
      this.$router.push({
        name: 'AdminFallback',
        params: {
          code: code
        }
      })
    },
    onQRCode() {
      WebViewJavascriptBridge.callHandler(
        'scan_and_result',
        {
          format: 'source'
        },
        (callback) => {
          this.checkQRCode(callback)
        }
      )
    },
    onRecord() {
      this.$router.push({
        name: 'AdminCheckRecord',
        params: {
          shopId: this.$route.params.shopId
        }
      })
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
