<template>
  <div class="content">
    <van-tabs v-model="active" :ellipsis="false">
      <van-tab :name="tab.id" v-for="tab in tabList" :key="tab.id" :title="tab.name">
        <picture-list v-if="tab.type === getTypeList['PICTURE_LIST']" :active="active" />
        <user-list v-if="tab.type === getTypeList['USER_LIST']" :active="active" />
        <video-list v-if="tab.type === getTypeList['VIDEO_LIST']" :active="active" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import PictureList from './dynamic/picture-list'
import UserList from './dynamic/user-list'
import VideoList from './dynamic/video-list'
import { ListTypes } from '../../constants'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'picture-list': PictureList,
    'user-list': UserList,
    'video-list': VideoList,
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
  computed: {
    getTypeList() {
      return ListTypes
    },
  },
}
</script>

<style lang="less" scoped>
.content {
}
</style>
