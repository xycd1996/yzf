<!-- Editor:xuyuchen -->
<template>
  <div class="address">
    <van-address-list
      @add="handleAdd"
      @edit="handleEdit"
      default-tag-text="默认"
      v-model="chosenAddressId"
      :list="list"
      @select="handleSelect"
    ></van-address-list>
    <router-view />
  </div>
</template>

<script>
import { AddressList } from 'vant'
import AddressApi from '@api/address'

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
  methods: {
    async _initAddress() {
      const { data } = await AddressApi.get()
      data.length && (this.chosenAddressId = data[0].id)
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
    handleAdd() {},
    handleEdit() {
      this.$router.push('/address/edit')
    },
    handleSelect(item) {
      console.log(item)
      this.$router.back()
    }
  },
  mounted() {
    this._initAddress()
  }
}
</script>
<style lang="scss" scoped></style>
