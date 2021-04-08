import Vue from 'vue'
import VueRouter from 'vue-router'

const PageView = () => import('@views/index')
const Home = () => import('@views/home/home')
const All = () => import('@views/all/all')
const Order = () => import('@views/order/order')
const Cart = () => import('@views/cart/cart')
const GoodsDetail = () => import('@views/goods-detail/goods-detail')
const Shop = () => import('@views/shop/shop')
const Search = () => import('@views/search/search')
const Settlement = () => import('@views/order-settlement/order-settlement')
const Address = () => import('@views/address/address')
const AddressEdit = () => import('@views/address/address-edit')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PageView',
    component: PageView,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/all',
        name: 'All',
        component: All,
      },
      {
        path: '/order',
        name: 'Order',
        component: Order,
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
      },
    ],
  },
  {
    path: '/goods/:id',
    name: 'GoodsDetail',
    component: GoodsDetail,
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: Shop,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/settlement/:id',
    name: 'Settlement',
    component: Settlement,
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    children: [
      {
        path: 'edit',
        name: 'AddressEdit',
        component: AddressEdit,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
})

export default router
