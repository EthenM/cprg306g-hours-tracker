<template>
    <button
        @click="props.clicked"
        class="w-fit h-fit p-5 bg-blue-800 rounded-full shadow-lg
            shadow-slate-800 hover:bg-blue-700 active:bg-blue-900
            border-4 border-blue-950 active:border-blue-900"
    >
        <slot></slot>
    </button>
</template>

<script setup>

    const props = defineProps({
        clicked: {Type: Function, default: () => true}
    })

</script>
