// 制片厂管理路由

import lazyRouter from '@/utils/lazyRouter'

const FilmFactoryRoutes = [
  {
    path: '/film-factory-manage',
    component: () => lazyRouter(import('../views/film-factory-manage/index')),
    redirect: '/film-factory-manage/index',
    children: [
      {
        path: 'index',
        component: () => lazyRouter(import('../views/film-factory-manage/views/manage/manage'))
      },
      {
        path: 'picture-detail/:id',
        component: () => lazyRouter(import('../views/film-factory-manage/views/picture-detail/picture-detail'))
      },
      {
        path: 'publish',
        component: () => lazyRouter(import('../views/film-factory-manage/views/publish/publish'))
      }
    ]
  },
  {
    path: '/join-film-factory',
    redirect: '/join-film-factory/index',
    component: () => lazyRouter(import('../views/join-film-factory/join-film-factory')),
    children: [
      {
        path: 'index',
        component: () => lazyRouter(import('../views/join-film-factory/home/home'))
      },
      {
        path: 'list',
        component: () => lazyRouter(import('../views/join-film-factory/film-factory-list/film-factory-list'))
      }
    ]
  }
]

export default FilmFactoryRoutes
