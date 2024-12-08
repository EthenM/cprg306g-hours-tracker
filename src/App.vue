<template>
    <AppHeader class="grow-0"/>

    <main class="grow">
        <RouterView/>
    </main>

</template>

<script setup>
    import { RouterView } from 'vue-router'
    import AppHeader from './components/AppHeader.vue';

</script>

<style scoped>

</style>
