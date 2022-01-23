<template>
  <div class="total">
    <div class="num">
      <span class="text">会员情况（{{ detail.memberCounts }} / {{ detail.memberMaxLimit }}）</span>
      <van-progress :percentage="formatNum(detail.memberCounts, detail.memberMaxLimit)" />
    </div>
    <div class="num">
      <span class="text"
        >会员发布视频情况（今日）（{{ detail.videoCountToday }} / {{ detail.videoCountTodayLimit }}）
      </span>
      <van-progress :percentage="formatNum(detail.videoCountToday, detail.videoCountTodayLimit)" />
    </div>
    <div class="num">
      <span class="text"
        >会员发布视频情况（上周）（{{ detail.videoCountLastWeek }} / {{ detail.videoCountLastWeekLimit }}）</span
      >
      <van-progress :percentage="formatNum(detail.videoCountLastWeek, detail.videoCountLastWeekLimit)" />
    </div>
    <div class="num">
      <span class="text"
        >会员发布视频情况（上月）（{{ detail.videoCountMonth }} / {{ detail.videoCountMonthLimit }}）</span
      >
      <van-progress :percentage="formatNum(detail.videoCountMonth, detail.videoCountMonthLimit)" />
    </div>
    <van-cell title="制片厂会员总收益" :value="detail.memberIncomes" />
    <van-cell title="制片厂会员购买订单" :value="`${detail.memberMOrderCounts}笔 / ${detail.memberMOrderIntegrals}积分`" />
  </div>
</template>

<script>
import { Cell, Progress } from 'vant'
import Api from '../../api'
export default {
  components: {
    'van-progress': Progress,
    'van-cell': Cell
  },
  data() {
    return {
      detail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { data } = await Api.getUserStatics()
      this.detail = data
    },
    formatNum(num1, num2) {
      if (!num1 && !num2) {
        return 0
      }
      return parseInt((num1 / num2) * 100)
    }
  }
}
</script>

<style lang="less" scoped>
.total {
  background: #fff;
  .num {
    padding: 10px;
    font-size: 14px;
    .text {
      display: inline-block;
      margin-bottom: 16px;
    }
  }
}
</style>
