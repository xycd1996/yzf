const AdministratorRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/login',
    component: () => import('@views/administrator/administrator'),
    children: [
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => import('@views/administrator/login/login'),
      },
      {
        path: 'shopList',
        name: 'AdminShopList',
        component: () => import('@views/administrator/shop-list/shop-list'),
      },
      {
        path: 'checkOff/:shopId',
        name: 'AdminCheckOff',
        component: () => import('@views/administrator/check-off/check-off'),
      },
      {
        path: 'checkRecord/:shopId',
        name: 'AdminCheckRecord',
        component: () => import('@views/administrator/check-record/check-record'),
      },
      {
        path: 'fallback/:code',
        name: 'AdminFallback',
        component: () => import('@views/administrator/fallback/fallback'),
      },
    ],
  },
]

export default AdministratorRoutes
