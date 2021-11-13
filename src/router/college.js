// 学院页面

const CollegeRoutes = [
  {
    path: '/college',
    name: 'College',
    redirect: '/college/index',
    component: () => import('@views/college/college'),
    children: [
      {
        path: 'index',
        name: 'CollegeHome',
        exact: true,
        component: () => import('@views/college/views/college-home/college-home'),
      },
      {
        path: 'category-page/:id?',
        name: 'CategoryPage',
        component: () => import('@views/college/views/category-page/category-page'),
      },
    ],
  },
]

export default CollegeRoutes
