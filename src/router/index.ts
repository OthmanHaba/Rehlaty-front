import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            component: () => import('@/views/Auth/login.vue'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/',
            meta: {
                requiresAuth: true,
            },
            component: () => import('@/layouts/AuthLayout.vue'),
            children: [
                {
                    path: '',
                    component: () => import('@/views/index.vue'),
                },
                {
                    path: 'users',
                    component: () => import('@/views/User/index.vue'),
                },
                {
                    path: 'roles',
                    component: () => import('@/views/Role/index.vue'),
                },
                {
                    path: 'activities',
                    component: () => import('@/views/Activity/index.vue'),
                },
                {
                    path: 'groups',
                    component: () => import('@/views/Group/index.vue'),
                },
                {
                    path: 'groups/create',
                    component: () => import('@/views/Group/create.vue'),
                }
            ],
        },
    ],
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token') !== null
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ path: '/login' })
    } else {
        next()
    }
})

export default router
