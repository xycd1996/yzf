import lazyRouter from '@/utils/lazyRouter'
import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminRoutes from './administrator'
import CollegeRoutes from './college'

// 商城页面
const PageView = () => lazyRouter(import('@views/index'))
const Home = () => lazyRouter(import('@views/home/home'))
const Collect = () => lazyRouter(import('@views/collect/collect'))
const Category = () => lazyRouter(import('@views/category/category'))
const All = () => lazyRouter(import('@views/all/all'))
const Order = () => lazyRouter(import('@views/order/order'))
const OrderDetail = () => lazyRouter(import('@views/order-detail/order-detail'))
const Cart = () => lazyRouter(import('@views/cart/cart'))
const GoodsDetail = () => lazyRouter(import('@views/goods-detail/goods-detail'))
const GeneralMerchandise = () => lazyRouter(import('@views/goods-detail/general-merchandise/general-merchandise'))
const SecondhandGoods = () => lazyRouter(import('@views/goods-detail/secondhand-goods/secondhand-goods'))
const Bidding = () => lazyRouter(import('@views/goods-detail/bidding/bidding'))
const OfflineGoods = () => lazyRouter(import('@views/goods-detail/offline-goods/offline-goods'))
const Shop = () => lazyRouter(import('@views/shop/shop'))
const Search = () => lazyRouter(import('@views/search/search'))
const Settlement = () => lazyRouter(import('@views/order-settlement/order-settlement'))
const CustomerChat = () => lazyRouter(import('@views/customer-chat/customer-chat'))
const Address = () => lazyRouter(import('@views/address/address'))
const AddressEdit = () => lazyRouter(import('@views/address/address-edit/address-edit'))

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
        component: Home
      },
      {
        path: '/category',
        name: 'Category',
        component: Category
      },

      {
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: '/collect',
        name: 'Collect',
        component: Collect
      }
    ]
  },
  {
    path: '/chat/:id',
    name: 'CustomerChat',
    component: CustomerChat
  },
  {
    path: '/orderDetail/:id',
    name: 'OrderDetail',
    component: OrderDetail
  },
  {
    path: '/all/:type?',
    name: 'All',
    component: All
  },
  {
    path: '/goods',
    name: 'GoodsDetail',
    component: GoodsDetail,
    children: [
      {
        path: 'general/:id',
        name: 'GeneralMerchandise',
        component: GeneralMerchandise
      },
      {
        path: 'secondhand/:id',
        name: 'SecondhandGoods',
        component: SecondhandGoods
      },
      {
        path: 'bidding/:id',
        name: 'Bidding',
        component: Bidding
      },
      {
        path: 'offline/:id',
        name: 'OfflineGoods',
        component: OfflineGoods
      }
    ]
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/settlement/:id',
    name: 'Settlement',
    component: Settlement
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    children: [
      {
        path: 'edit/:id?',
        name: 'AddressEdit',
        component: AddressEdit
      }
    ]
  },
  ...AdminRoutes,
  ...CollegeRoutes,
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const { token, uid } = to.query
  if (token && uid) {
    localStorage.setItem('token', token)
    localStorage.setItem('uid', uid)
  }
  next()
})

export default router
