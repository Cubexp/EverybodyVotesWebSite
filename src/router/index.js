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
                path: '/help',
                name: 'help',
                component: () => import('@/views/home/modules/help'),
            },
            {
                path: '/helpDetail/:id',
                name: 'helpDetail',
                component: () => import('@/views/home/modules/helpDetail'),
                props: true,
            },
            {
                path: '/notice',
                name: 'notice',
                component: () => import('@/views/home/modules/helpDetail'),
            },
            {
                path: '/activity/:id',
                name: 'activity',
                component: () => import('@/views/home/modules/activity'),
                props: true,
            },
            {
                path: '/activitySort/:id',
                name: 'activitySort',
                component: () => import('@/views/home/modules/activitySort'),
                props: true,
            },
            {
                path: '/activityIntroduce/:id',
                name: 'activityIntroduce',
                component: () =>
                    import('@/views/home/modules/activityIntroduce'),
                props: true,
            },
            {
                path: '/activityEdit/:id',
                name: 'activityEdit',
                component: () => import('@/views/home/modules/activityEdit'),
                props: true,
            },
            {
                path: '/activityPlayer/:id',
                name: 'activityPlayer',
                component: () => import('@/views/home/modules/activityPlayer'),
                props: true,
            },
        ],
    },
    {
        path: '/backstage',
        name: 'backstage',
        redirect: '/backstage/newsList',
        component: () => import('@/views/backstage/index'),
        children: [
            {
                path: 'newsList',
                name: 'newsList',
                component: () => import('@/views/backstage/news/newsList'),
            },
            {
                path: 'newsPublish',
                name: 'newsPublish',
                component: () => import('@/views/backstage/news/newsPublish'),
            },
            {
                path: 'newsType',
                name: 'newsType',

                component: () => import('@/views/backstage/news/newsType'),
            },
            {
                path: '/newsEdit/:id',
                name: 'newsEdit',
                component: () => import('@/views/backstage/news/editNews'),
                props: true,
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

router.beforeEach(async (to, from, next) => {
    return next()
})

export default router
