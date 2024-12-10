<template>

    <button @click="signIn">Sign in With GitHub</button>
    <p v-if="errors">{{ errors }}</p>
    
</template>

<script setup>
    import { ref } from 'vue';
    import { githubAuthProvider } from '@/main';
    import { signInWithPopup } from 'firebase/auth';
    import { useCurrentUser, useFirebaseAuth } from 'vuefire';


    const auth = useFirebaseAuth()
    const user = useCurrentUser()
    const errors = ref(null)

    const signIn = () => {
        signInWithPopup(auth, githubAuthProvider)
            .then(r => {
                if (user.value) {
                    location.pathname = "/"
                }
            })
            .catch(err => {
                console.error("ERROR: signIn: Sign in failed: " + err)
            })
    }

</script>
