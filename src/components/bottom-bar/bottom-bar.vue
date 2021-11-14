<template>
  <footer class="bottom-bar">
    <van-tabbar :route="true" active-color="#FE0200" placeholder>
      <van-tabbar-item v-for="(tab, index) in tabs" :key="index" :to="tab.url">
        <span>{{ tab.name }}</span>
        <template #icon="props">
          <van-icon size="2rem" :name="props.active ? tab.icon : tab.icon_select" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from 'vant'
import Api from './api'

export default {
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem,
    'van-icon': Icon
  },
  data() {
    return {
      active: 0,
      tabs: []
    }
  },
  mounted() {
    this.getBottomBar()
  },
  methods: {
    async getBottomBar() {
      const { data } = await Api.getBottomBar({ position: 'bottom' })
      this.tabs = data
    }
  }
}
</script>
