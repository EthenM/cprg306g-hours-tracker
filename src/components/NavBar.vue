<template>
    <nav class="border-b border-blue-950">
        <!-- this will contain the different pages of the application -->
         <ul>
            <li><a class="text-gray-300 hover:text-blue-500 transition-colors" href="/">Home</a></li>
            <li><a class="text-gray-300 hover:text-blue-500 transition-colors" href="/entries">Entries</a></li>
            <li><a class="text-gray-300 hover:text-blue-500 transition-colors" href="/companies">Companies</a></li>
            <li><a class="text-gray-300 hover:text-blue-500 transition-colors" href="/projects">Projects</a></li>
         </ul>
    </nav>
</template>

<script setup>

</script>

<style scoped>

    ul {
        list-style-type: none;
        display: flex;
        justify-content: space-around;
        padding: 0;
    }

</style>
