<template>
  <div class="qrcode-info">
    <van-cell-group title="二维码信息">
      <van-cell class="cell" v-for="qrcode in qrcodeList" :key="qrcode.id">
        <div class="content">
          <div class="code">券码：{{ qrcode.discount_no }}</div>
          <div class="qrcode">
            <div v-if="qrcode.status != 0" class="invalidation">
              {{ getStatusText(qrcode.status) }}
            </div>
            <qrcode-vue
              :value="qrcode.discount_no"
              :foreground="qrcode.status != 0 ? '#dddddd' : '#000000'"
              :size="140"
              level="H"
            />
          </div>
          <div class="tip">请向商家出示二维码使用该券</div>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'QRCodeInfo',
  props: {
    qrcodeList: Array
  },
  components: {
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'qrcode-vue': QrcodeVue
  },
  methods: {
    getStatusText(status) {
      return status == 1 ? '已核销' : status == 2 ? '已过期' : ''
    }
  }
}
</script>

<style lang="less" scoped>
.qrcode-info {
  .cell {
    margin-bottom: 10px;
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .qrcode {
        position: relative;
        margin: 10px 0;
        .invalidation {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: absolute;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
