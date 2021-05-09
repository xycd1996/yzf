<!-- Editor:xuyuchen -->
<template>
  <div class="search-view">
    <div class="search">
      <van-search
        show-action
        @search="handleOnSearch"
        @cancel="handleCancel"
        autofocus
        v-model="value"
        placeholder="请输入商品名称"
      />
    </div>
    <div class="history">
      <div class="title">
        <span>搜索历史</span>
        <van-icon @click="handleClear" size="1.6rem" name="delete" />
      </div>
      <van-tag
        v-for="(item, index) in history"
        :key="index"
        @click="onClickHistory(item)"
        class="tag"
        size="large"
        round
        color="#f0f0f0"
        text-color="#333"
        >{{ item }}</van-tag
      >
    </div>
  </div>
</template>

<script>
import { Search, Tag, Icon } from 'vant'

export default {
  components: {
    'van-search': Search,
    'van-tag': Tag,
    'van-icon': Icon
  },
  data() {
    return {
      value: '',
      history: []
    }
  },
  methods: {
    handleOnSearch() {
      if (!this.value) {
        return
      }
      this.history.push(this.value)
      sessionStorage.setItem('historySearch', JSON.stringify(this.history))
      this.$router.push({
        name: 'All',
        query: {
          keyword: this.value
        }
      })
    },
    handleClear() {
      this.history = []
      sessionStorage.clear()
    },
    handleCancel() {
      this.$router.push({
        name: 'Home'
      })
    },
    onClickHistory(keyword) {
      this.$router.push({
        name: 'All',
        query: {
          keyword
        }
      })
    }
  },
  mounted() {
    sessionStorage.getItem('historySearch') && (this.history = JSON.parse(sessionStorage.getItem('historySearch')))
  }
}
</script>
<style lang="less" scoped>
@import '~@assets/less/theme.less';

.search-view {
  .history {
    background-color: #fff;
    padding: 10px 16px;
    .title {
      margin: 0 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: @medium-font-size;
      color: @title-color;
    }
    .tag {
      margin-right: 0.8rem;
      margin-bottom: 0.6rem;
    }
  }
}
</style>
