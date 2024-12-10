import './assets/main.css'

import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider } from 'firebase/auth'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { getFirestore } from 'firebase/firestore'


export const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
});


export const githubAuthProvider = new GithubAuthProvider()
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)

const app = createApp(App).use(router).use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth(),
    ]

}).mount('#app')
