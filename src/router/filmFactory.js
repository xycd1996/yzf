// 制片厂管理路由

import lazyRouter from '@/utils/lazyRouter'

const FilmFactoryRoutes = [
  {
    path: '/filmFactoryManage',
    component: () => lazyRouter(import('../views/film-factory-manage/film-factory-manage'))
  },
  {
    path: '/joinFilmFactory',
    redirect: '/joinFilmFactory/index',
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
