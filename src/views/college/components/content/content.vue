<template>
  <div class="content">
    <van-tabs v-model="active" :ellipsis="false">
      <van-tab :name="tab.id" v-for="tab in tabList" :key="tab.id" :title="tab.name">
        <picture-list :active="active" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import PictureList from './dynamic/picture-list.vue'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'picture-list': PictureList,
  },
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: this.tabList[0].id,
    }
  },
  watch: {
    active: function(val, oldVal) {},
  },
}
</script>

<style lang="less" scoped>
.content {
}
</style>
