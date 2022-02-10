<template>
  <div class="ranking">
    <van-tabs type="card" v-model="active">
      <van-tab title="积分排行" />
      <van-tab title="综合排行" />
      <van-tab title="视频量排行" />
    </van-tabs>
    <div class="top">
      <div class="second">
        <div class="info">
          <van-image class="avatar" src="https://qnm.hunliji.com/o_1fk2hhnb9kuvhgr9b611khjp9.jpg" />
          <div class="name">朱砂古筝只怕从</div>
        </div>
        <div class="rank">
          <span class="level">2</span>
          <span>98.1</span>
        </div>
      </div>
      <div class="first">
        <div class="info">
          <van-image class="avatar" src="https://qnm.hunliji.com/o_1fk2hhnb9kuvhgr9b611khjp9.jpg" />
          <div class="name">朱砂古筝只怕从</div>
        </div>
        <div class="rank">
          <span class="level">2</span>
          <span>98.1</span>
        </div>
      </div>
      <div class="third">
        <div class="info">
          <van-image class="avatar" src="https://qnm.hunliji.com/o_1fk2hhnb9kuvhgr9b611khjp9.jpg" />
          <div class="name">朱砂古筝只怕从</div>
        </div>
        <div class="rank">
          <span class="level">2</span>
          <span>98.1</span>
        </div>
      </div>
    </div>
    <div class="list">
      <van-cell v-for="(item, index) in list" :key="index" :title="item.nickname" :value="getCount(item)" />
    </div>
  </div>
</template>

<script>
import { Cell, Tab, Tabs, Image } from 'vant'
import Api from '../../api'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-cell': Cell,
    'van-image': Image
  },
  data() {
    return {
      list: [],
      active: 0
    }
  },
  mounted() {
    this.getRankingList()
  },
  methods: {
    getCount(detail) {
      if (this.active === 0) {
        return detail.integrals + '积分'
      } else if (this.active === 1) {
        return detail.score
      } else {
        return detail.videos + '量'
      }
    },
    async getRankingList() {
      const { data } = await Api.getRankingList({
        type: this.active
      })
      this.list = data
    }
  },
  watch: {
    active: function() {
      this.getRankingList()
    }
  }
}
</script>

<style lang="less" scoped>
.ranking {
  margin-top: 20px;
  .top {
    margin-top: 66px;
    display: flex;
    align-items: flex-end;
    .second {
      width: 33%;
      height: 60px;
      border: 1px solid #ccc;
    }
    .first {
      width: 33%;
      height: 80px;
      border: 1px solid #ccc;
    }
    .third {
      width: 33%;
      height: 40px;
      border: 1px solid #ccc;
    }
    .second,
    .first,
    .third {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .info {
        position: absolute;
        top: -58px;
        display: flex;
        font-size: 14px;
        font-weight: bold;
        flex-direction: column;
        align-items: center;
        .avatar {
          width: 30px;
          height: 30px;
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid #ccc;
        }
      }
      .rank {
        display: flex;
        flex-direction: column;
        align-items: center;
        .level {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
