<!-- Editor:xuyuchen -->
<template>
  <div class="address">
    <van-address-list
      @add="handleAdd"
      @edit="handleEdit"
      default-tag-text="默认"
      :value="chosenAddressId"
      :list="list"
      @select="handleSelect"
    />
    <router-view />
  </div>
</template>

<script>
import { AddressList } from 'vant'
import AddressApi from '@api/address'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'van-address-list': AddressList
  },
  data() {
    return {
      chosenAddressId: '',
      list: []
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 从编辑页回来的时候重新请求接口
    if (from.name === 'AddressEdit') {
      this._initAddress()
    }
    next()
  },
  computed: {
    ...mapGetters(['addressInfo'])
  },
  methods: {
    ...mapActions(['setAddressInfo']),
    async _initAddress() {
      const { data } = await AddressApi.getList()
      this.chosenAddressId = this.addressInfo?.id
      this.list = data.map((item) => {
        const newItem = this.serializationAddress(item)
        return newItem
      })
    },
    serializationAddress(address) {
      const newAddress = {
        id: address.id,
        name: address.ConsigneeName,
        tel: address.ConsigneePhone,
        address: address.DetailCity + address.DetailAddr,
        isDefault: address.IsDefault === 1 ? true : false
      }
      return newAddress
    },
    handleAdd() {
      this.$router.push({
        name: 'AddressEdit'
      })
    },
    handleEdit(item) {
      this.$router.push({
        name: 'AddressEdit',
        params: {
          id: item.id
        }
      })
    },
    handleSelect(item) {
      console.log('item: ', item)
      this.setAddressInfo({
        id: item.id,
        ConsigneeName: item.name,
        ConsigneePhone: item.tel,
        DetailAddr: item.address
      })
      this.$router.back()
    }
  },
  mounted() {
    this._initAddress()
  }
}
</script>
<style lang="less" scoped></style>
