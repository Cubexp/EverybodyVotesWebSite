import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index'),
    children: [
      {
        path: 'create',
        name: 'create',
        component: () => import ('@/views/home/create')
      },
      {
        path: 'manage',
        name: 'manage',
        component: () => import ('@/views/home/manage')
      }
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error-page'),
    children: [
        {
            path: '401',
            name: 'error-401',
            component: () => import ('@/views/error-page/401')
        },
        {
            path: '404',
            name: 'error-404',
            component: () => import ('@/views/error-page/404')
        }
    ]
  },
  {
    path: '*', // 页面不存在的情况下会跳到404页面
    redirect: '/error/404',
    name: 'notFound',
    hidden: true 
  }
]

const router = new VueRouter({
  routes
})

export default router
