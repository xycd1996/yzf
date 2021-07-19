<!-- Editor:xuyuchen -->
<template>
  <div class="cart">
    <div v-if="!loading" class="list">
      <div v-if="cartList.length" class="container">
        <van-pull-refresh class="pull-refresh" success-text="刷新成功" @refresh="onPullRefresh" v-model="pullLoading">
          <ul>
            <li v-for="(shop, index) in cartList" :key="index" class="shop-item">
              <van-panel>
                <template #header>
                  <div class="title van-hairline--top-bottom">
                    <van-icon name="shop-o" size="1.26rem" />
                    <span>{{ shop.shop_name }}</span>
                    <van-icon name="arrow" />
                  </div>
                </template>
                <van-checkbox-group class="goods-content" v-model="checkedGroup">
                  <van-swipe-cell v-for="goods in shop.records" :key="goods.id" class="goods-item">
                    <template #right>
                      <van-button square text="删除" type="danger" class="delete-button" />
                    </template>
                    <div class="goods">
                      <van-checkbox class="goods-checkbox" :name="goods" />
                      <van-card
                        class="goods-card"
                        :price="goods.price"
                        :title="goods.product_title"
                        :thumb="goods.product_photo"
                      >
                        <template #tags>
                          <van-tag size="mini">{{ goods.product_specification_combine_value }}</van-tag>
                        </template>
                        <template #num>
                          <van-stepper
                            async-change
                            :name="goods.id"
                            @change="stepOnChange"
                            input-width="20px"
                            button-size="20px"
                            :value="goods.product_num"
                          />
                        </template>
                      </van-card>
                    </div>
                  </van-swipe-cell>
                </van-checkbox-group>
              </van-panel>
            </li>
          </ul>
        </van-pull-refresh>
      </div>
      <div v-if="!cartList.length" class="none">
        <van-empty image="search" description="购物车竟然是空的" />
      </div>
    </div>
    <div v-if="loading" class="loading">
      <van-loading color="#fe0200" />
    </div>
    <van-submit-bar @submit="handleSubmit" class="footer" :price="settlementPrice" button-text="结算">
      <van-checkbox v-show="cartList.length" @click="handleAllCheckbox" v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import {
  SubmitBar,
  Checkbox,
  Empty,
  Loading,
  PullRefresh,
  Panel,
  SwipeCell,
  Card,
  Button,
  Icon,
  CheckboxGroup,
  Tag,
  Stepper,
  Toast
} from 'vant'
import CartApi from '@api/cart'

export default {
  name: 'Cart',
  components: {
    'van-submit-bar': SubmitBar,
    'van-checkbox': Checkbox,
    'van-empty': Empty,
    'van-loading': Loading,
    'van-pull-refresh': PullRefresh,
    'van-panel': Panel,
    'van-swipe-cell': SwipeCell,
    'van-card': Card,
    'van-button': Button,
    'van-icon': Icon,
    'van-checkbox-group': CheckboxGroup,
    'van-tag': Tag,
    'van-stepper': Stepper
  },
  data() {
    return {
      checked: false,
      cartList: [],
      loading: true,
      pullLoading: false,
      checkedGroup: [],
      cartCount: 0,
      settlementPrice: 0
    }
  },
  methods: {
    async stepOnChange(val, detail) {
      const goods = detail.name
      await CartApi.update({ id: goods.id, num: val })
      goods.product_num = val
    },
    async handleSubmit() {
      if (!this.checkedGroup.length) {
        Toast({
          message: '您还没有选择宝贝哦'
        })
        return
      }
      const goodsIds = []
      this.checkedGroup.forEach((el) => {
        goodsIds.push(el.id)
      })
      this.$router.push({ path: `/settlement/${goodsIds.join(',')}`, query: { fromCart: true } })
    },
    async _queryCarts() {
      const { data } = await CartApi.get()
      this.loading = false
      this.pullLoading = false
      this.cartList = data
      data.forEach((el) => {
        this.cartCount += el.records.length
      })
    },
    async onPullRefresh() {
      this._queryCarts()
    },
    handleAllCheckbox() {
      this.checkedGroup = []
      if (this.checked) {
        this.cartList.forEach((el) => {
          el.records.forEach((item) => {
            this.checkedGroup.push(item)
          })
        })
      }
    }
  },
  mounted() {
    this._queryCarts()
  },
  watch: {
    checkedGroup: {
      deep: true,
      handler: function(newVal) {
        if (newVal.length === this.cartCount) {
          this.checked = true
        } else {
          this.checked = false
        }
        this.settlementPrice = 0
        this.checkedGroup.forEach((el) => {
          this.settlementPrice += parseFloat(el.price) * 100 * el.product_num
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@assets/less/theme';
.cart {
  .none {
    height: 80vh;
    .van-empty {
      height: 100%;
    }
  }
  .container {
    margin-bottom: 50px;
    .pull-refresh {
      min-height: calc(100vh - 100px);
      .shop-item {
        margin: 1rem;
        border-radius: 10px;
        overflow: hidden;
        background-color: #ffffff;
        .title {
          display: flex;
          padding: 10px;
          margin-bottom: 1px;
          align-items: center;
          font-size: @medium-font-size;
          span {
            margin: 0 4px;
          }
        }
        .goods-content {
          padding: 10px 0;
          .goods-item {
            .goods {
              display: flex;
              .goods-checkbox {
                margin-left: 16px;
                display: flex;
                justify-content: center;
                flex: 0 0 2rem;
              }
              .goods-card {
                flex: 1 1 auto;
                margin: 0;
                background-color: #ffffff;
              }
            }
            .delete-button {
              height: 100%;
            }
          }
        }
      }
    }
  }
  .footer {
    margin-bottom: 49px;
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
  }
}
</style>
