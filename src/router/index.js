import { auth } from '@/main'
import { getIdToken, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { useCurrentUser } from 'vuefire'

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
            path: '/login',
            name: 'Login',
            component: () => import('@/views/LoginView.vue'),
        },
    ],
})


router.beforeEach((to, from, next) => {

    let redirected = false

    //if the user isn't logged in, and the router isn't directing the user
    //to the login page, this will send the user off to the login page.
    onAuthStateChanged(auth, user => {
        // console.dir(user)
        // console.dir(to)

        if (!user && to.name != 'Login' && !redirected) {
            // console.log("redirecting to login...")
            redirected = true
            next({ name: 'Login'})
        } else if (!redirected) {
            // console.log('also here.')
            redirected = true
            next()
        }
    })
})

export default router
