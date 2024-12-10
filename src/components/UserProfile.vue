<template>

    <p class="p-2 cursor-pointer" @click="() => openSide = true">{{ user.displayName }}</p>

    <section v-if="openSide"
        class="absolute h-screen w-1/4 bg-slate-900 border-l-2 border-blue-950 right-0 rounded-l-xl"
    >

        <header class="flex justify-between p-3 border-b border-b-blue-950">
            <button class="cursor-pointer" @click="() => openSide = false">close</button>
            <div class="text-right">
                <h2 class="text-xl">{{ user.displayName }}</h2>
                <p class="text-xs">{{ user.email }}</p>
            </div>
        </header>

        <section class="p-3 flex justify-end">
            <button
                class="border border-blue-950 bg-slate-800 hover:bg-slate-900 active:bg-slate-950 rounded-lg
                    py-1 px-2"
                @click="logout"
            >
                Logout
            </button>
        </section>

    </section>

</template>

<script setup>
    import { auth } from '@/main';
import { signOut } from 'firebase/auth';
    import { ref } from 'vue';
    import { useCurrentUser } from 'vuefire';


    const user = useCurrentUser()
    const openSide = ref(false)

    const logout = () => {
        signOut(auth)
            .then(r => {
                //this ensures that the user is redirected successfully.
                location.pathname = '/login'
            })
            .catch(err => {
                console.error("ERROR: logout: " + err)
            })
    }

</script>
