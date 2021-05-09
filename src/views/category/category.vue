<template>
  <div class="category">
    <van-row>
      <van-col span="4">
        <van-sidebar v-model="active">
          <van-sidebar-item v-for="item in sidebarList" :key="item.id" :title="item.name"></van-sidebar-item>
        </van-sidebar>
      </van-col>
      <van-col span="20">
        <my-content :bannerList="getBannerList" :cate="getCate" />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Col, Row, Sidebar, SidebarItem } from 'vant'
import Content from './content/content'
import CategroyApi from '@/api/category'

export default {
  components: {
    'van-sidebar': Sidebar,
    'van-sidebar-item': SidebarItem,
    'van-row': Row,
    'van-col': Col,
    'my-content': Content
  },
  data() {
    return {
      active: 0,
      sidebarList: []
    }
  },
  mounted() {
    this._getCategory()
  },
  computed: {
    getBannerList() {
      return this.sidebarList[this.active]?.banners ?? []
    },
    getCate() {
      return this.sidebarList[this.active]?.childs
    }
  },
  methods: {
    async _getCategory() {
      const { data } = await CategroyApi.get()
      this.sidebarList = data
    }
  }
}
</script>

<style lang="less" scoped>
.category {
  ::v-deep {
    .van-sidebar {
      width: 100%;
    }
  }
}
</style>
