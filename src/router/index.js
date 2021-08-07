import Vue from 'vue'
import VueRouter from 'vue-router'
import adminRoutes from './administrator'

const PageView = () => import('@views/index')
const Home = () => import('@views/home/home')
const Category = () => import('@views/category/category')
const All = () => import('@views/all/all')
const Order = () => import('@views/order/order')
const OrderDetail = () => import('@views/order-detail/order-detail')
const Cart = () => import('@views/cart/cart')
const GoodsDetail = () => import('@views/goods-detail/goods-detail')
const GeneralMerchandise = () =>
  import('@views/goods-detail/general-merchandise/general-merchandise')
const SecondhandGoods = () => import('@views/goods-detail/secondhand-goods/secondhand-goods')
const Bidding = () => import('@views/goods-detail/bidding/bidding')
const OfflineGoods = () => import('@views/goods-detail/offline-goods/offline-goods')
const Shop = () => import('@views/shop/shop')
const Search = () => import('@views/search/search')
const Settlement = () => import('@views/order-settlement/order-settlement')
const Address = () => import('@views/address/address')
const AddressEdit = () => import('@views/address/address-edit/address-edit')
const CustomerChat = () => import('@views/customer-chat/customer-chat')

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
  ...adminRoutes
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
