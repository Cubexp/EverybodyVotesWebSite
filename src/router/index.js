import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/home',
        component: () => import('@/views/home/index'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home/modules/home'),
            },
            {
                path: 'create',
                name: 'create',
                component: () => import('@/views/home/modules/create'),
            },
            {
                path: 'manage',
                name: 'manage',
                redirect: '/manage/votes_manage',
                component: () => import('@/views/home/modules/manage'),
                children: [
                    {
                        path: 'votes_manage',
                        name: 'votes_manage',
                        component: () => import('@/views/manage/votesManage'),
                    },
                ],
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/home/modules/login'),
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/views/home/modules/about'),
            },
            {
                path: 'help',
                name: 'help',
                component: () => import('@/views/home/modules/help'),
            },
            {
                path: 'notice',
                name: 'notice',
                component: () => import('@/views/home/modules/helpDetail'),
            },
        ],
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('@/views/error-page'),
        children: [
            {
                path: '401',
                name: 'error-401',
                component: () => import('@/views/error-page/401'),
            },
            {
                path: '404',
                name: 'error-404',
                component: () => import('@/views/error-page/404'),
            },
        ],
    },
    {
        path: '*', // 页面不存在的情况下会跳到404页面
        redirect: '/error/404',
        name: 'notFound',
        hidden: true,
    },
]

const router = new VueRouter({
    routes,
})

export default router
