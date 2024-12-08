import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            path: '/entries',
            name: 'Entries',
            component: () => import('@/views/EntriesView.vue'),
        },
        {
            path: '/companies',
            name: 'Companies',
            component: () => import('@/views/CompaniesView.vue'),
        },
        {
            path: '/projects',
            name: 'Projects',
            component: () => import('@/views/ProjectsView.vue'),
        },
    ],
})

export default router
