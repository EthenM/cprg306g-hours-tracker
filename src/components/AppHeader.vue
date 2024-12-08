<template>
    <header class="w-screen">
        <section class="flex justify-between border-b border-blue-800 mb-1">
            <h1 class="text-2xl p-2">TimeLedger</h1>
            <p class="p-2">User</p>
        </section>

        <!-- load in the navBar. This will be placed horizontally along the bottom of the header -->
        <NavBar/>
    </header>
</template>

<script setup>
    import NavBar from './NavBar.vue';

</script>

<style scoped>

</style>
