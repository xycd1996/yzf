<template>
  <div class="header">
    <van-nav-bar placeholder safe-area-inset-top fixed :title="getNavBarTitle" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon @click="handleRefresh" name="replay" size="16" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { Icon, NavBar } from 'vant'

export default {
  props: {
    onRefresh: Function
  },
  components: {
    'van-icon': Icon,
    'van-nav-bar': NavBar
  },
  computed: {
    getNavBarTitle() {
      return this.$route.query.shopName
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    handleRefresh() {
      this.onRefresh()
    }
  }
}
</script>

<style></style>
