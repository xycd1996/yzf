<template>
  <div class="join-film-factory">
    <van-nav-bar title="加入制片厂" left-arrow @click-left="onBack" />
    <div class="join-store">
      <van-icon name="gift-o" color="red" size="60" />
      <div>易视智富货品兑换平台</div>
      <div>欢迎爱心企业/个人入驻易视智富平台</div>
      <van-button style="margin-top: 10px" type="danger" @click="onClickStore">入驻商城</van-button>
    </div>
    <div class="join-factory">
      <van-icon name="video-o" color="red" size="60" />
      <div class="text">易视智富制片厂</div>
      <div class="text">请联系各制片厂管理员获取邀请码</div>
      <div class="text">输入制片厂邀请码</div>
      <div class="text">通过审核后成为制片厂会员</div>
      <van-field
        class="input"
        style="margin-top: 10px"
        placeholder="请输入邀请码或扫码加入"
        v-model="code"
        right-icon="scan"
        @click-right-icon="onScan"
      />
      <a @click="$router.push('/joinFilmFactory/list')">查看已开通制片厂</a>
      <van-button type="danger" @click="joinFactory">加入制片厂</van-button>
      <span style="margin-top: 10px">点击【加入制片厂】即同意</span>
      <span style="color: blue">《易视智富制片厂管理规定》</span>
      <span style="color: blue">《易视智富制片厂会员自律公约》</span>
    </div>
  </div>
</template>

<script>
import { Button, Field, Icon, NavBar, Toast } from 'vant'
import { closeWeb, onScanCode } from '@/utils/jsBridge'
import Api from '../api'
export default {
  components: {
    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-button': Button,
    'van-field': Field
  },
  data() {
    return {
      code: '',
      isAuth: false // 是否已认证
    }
  },
  created() {
    this.isAuth = this.$route.query.isAuth
  },
  methods: {
    onBack() {
      closeWeb()
    },
    onScan() {
      onScanCode('source', (code) => {
        this.code = code
      })
    },
    async joinFactory() {
      if (!this.code) {
        return Toast.fail('请输入邀请码')
      }
      await Api.joinFactory({
        invite_code: this.code
      })
      Toast.success('入驻成功')
    },
    onClickStore() {
      window.location.href = 'http://58.42.4.33:20004/applyShop/#/'
    }
  }
}
</script>

<style lang="less" scoped>
.join-film-factory {
  .join-store {
    padding: 20px;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    margin: 10px;
    font-size: 18px;
    font-weight: 500;
    background: #fff;
    border-radius: 20px;
    box-shadow: 1px 1px 10px #ddd;
  }
  .join-factory {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    margin: 10px;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 1px 1px 10px #ddd;
    .text {
      line-height: 1.5;
      font-size: 18px;
      font-weight: 500;
    }
    > a {
      margin-top: 4px;
      padding: 10px 0;
      font-size: 14px;
    }
    .input {
      background: #f1f1f1;
    }
  }
}
</style>
