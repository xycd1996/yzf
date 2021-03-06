// 学院页面

import lazyRouter from '@/utils/lazyRouter'

const CollegeRoutes = [
  {
    path: '/college',
    name: 'College',
    redirect: '/college/index',
    component: () => lazyRouter(import('@views/college/college')),
    children: [
      {
        path: 'index',
        name: 'CollegeHome',
        exact: true,
        component: () => lazyRouter(import('@views/college/views/college-home/college-home'))
      },
      {
        path: 'category-page/:id?',
        name: 'CategoryPage',
        component: () => lazyRouter(import('@views/college/views/category-page/category-page'))
      },
      {
        // 图文详情页
        path: 'picture-detail/:id',
        name: 'PictureDetail',
        component: () => lazyRouter(import('@views/college/views/picture-detail/picture-detail'))
      }
    ]
  }
]

export default CollegeRoutes
