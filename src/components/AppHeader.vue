<template>
    <header class="w-screen">
        <section class="flex justify-between border-b border-blue-800 mb-1">
            <h1 class="text-2xl p-2">TimeLedger</h1>
            <UserProfile v-if="user" />
        </section>

        <!-- load in the navBar. This will be placed horizontally along the bottom of the header -->
        <NavBar v-if="user" />
    </header>
</template>

<script setup>
    import { useCurrentUser } from 'vuefire';
import NavBar from './NavBar.vue';
import UserProfile from './UserProfile.vue';

    const user = useCurrentUser()

</script>

<style scoped>

</style>
