<template>
  <div id="page-view">
    <keep-alive include="Home">
      <router-view />
    </keep-alive>
    <bottom-bar />
  </div>
</template>
<script>
import BottomBar from '@components/bottom-bar/bottom-bar'
export default {
  name: 'PageView',
  components: {
    'bottom-bar': BottomBar
  }
}
</script>