<!-- Editor:xuyuchen -->
<template>
  <div class="address-edit">
    <van-address-edit
      :area-list="areaList"
      :show-delete="!!$route.params.id"
      :address-info="formatAddressInfo"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { AddressEdit, Toast } from 'vant'
import { AreaList, AreaAll } from '@kiter/area'
import AddressApi from '@api/address'

console.log(AreaList)

export default {
  components: {
    'van-address-edit': AddressEdit
  },
  data() {
    return {
      areaList: AreaList,
      addressInfo: {}
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    formatAddressInfo() {
      const detailCity = this.addressInfo?.DetailCity?.split(',')
      const formatInfo = {
        id: this.addressInfo?.id,
        name: this.addressInfo?.ConsigneeName,
        tel: this.addressInfo?.ConsigneePhone,
        addressDetail: this.addressInfo?.DetailAddr,
        areaCode:
          this.addressInfo?.cityCode ?? AreaAll.find((f) => f.name === detailCity?.[detailCity?.length - 1])?.code,
        isDefault: this.addressInfo?.IsDefault === 1
      }
      return formatInfo
    }
  },
  methods: {
    async init() {
      const id = this.$route.params.id
      if (!id) {
        return
      }
      const { data } = await AddressApi.getDetail({ address_id: id })
      this.addressInfo = data
    },
    onSave(content) {
      const id = this.$route.params.id
      if (id) {
        this._updateAddress(content)
      } else {
        this._createAddress(content)
      }
    },
    onDelete() {
      this._deleteAddress()
    },
    async _updateAddress(content) {
      const id = this.$route.params.id
      await AddressApi.update({
        address_id: id,
        ConsigneeName: content?.name,
        ConsigneePhone: content?.tel,
        DetailCity: [content?.province, content?.city, content?.county].filter(Boolean).join(','),
        DetailAddr: content?.addressDetail,
        IsDefault: content?.isDefault ? 1 : 2,
        cityCode: content?.areaCode
      })
      Toast({
        message: '修改成功',
        onClose: () => this.$router.back()
      })
    },
    async _deleteAddress() {
      const id = this.$route.params.id
      await AddressApi.delete({ address_id: id })
      Toast({
        message: '删除成功',
        onClose: () => this.$router.back()
      })
    },
    async _createAddress(content) {
      await AddressApi.create({
        ConsigneeName: content?.name,
        ConsigneePhone: content?.tel,
        DetailCity: [content?.province, content?.city, content?.county].filter(Boolean).join(','),
        DetailAddr: content?.addressDetail,
        IsDefault: content?.isDefault ? 1 : 2,
        cityCode: content?.areaCode
      })
      Toast({
        message: '保存成功',
        onClose: () => this.$router.back()
      })
    }
  }
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
