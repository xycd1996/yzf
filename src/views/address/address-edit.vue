<!-- Editor:xuyuchen -->
<template>
  <div class="address-edit">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { AddressEdit, Toast } from 'vant'
import AreaList from '@assets/js/area'

export default {
  components: {
    'van-address-edit': AddressEdit
  },
  data() {
    return {
      areaList: AreaList,
      searchResult: [],
    };
  },
  methods: {
    onSave(content) {
      console.log(content)
      Toast('save');
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
}

</script>
<style lang="less" scoped>
.address-edit {
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background: #fff;
  z-index: 999;
}
</style>