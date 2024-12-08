<template>
    <div class="flex items-center" :class="props.label ? 'gap-1' : ''">
        <label v-if="props.label" :for="props.id">{{ props.label }}</label>
        <input v-if="props.type != 'textarea'"
            :id="props.id"
            v-model="model"
            :title="props.title"
            class="bg-slate-950 rounded-lg p-2 border border-blue-950 w-full focus:bg-slate-800"
            :type="props.type"
        />
        <textarea v-else
            :id="props.id"
            v-model="model"
            :rows="props.rows"
            :title="props.title"
            @input="autoResize"
            class="bg-slate-950 rounded-lg p-2 border border-blue-950 w-full focus:bg-slate-800
                resize-x max-w-96 min-w-20"
        ></textarea>
    </div>
</template>

<script setup>
import { watch, watchEffect } from 'vue';


    const model = defineModel()

    const emits = defineEmits(['update:changed'])

    const props = defineProps({
        type: {type: String, default: 'text'},
        id: {type: String, default: ''},
        label: {type: String, default: null},
        title: {type: String, default: null},
        rows: {type: Number, default: 1},
    })


    watch(() => model.value, (newVal, oldVal) => {
        
        if (newVal != oldVal) {
            emits('update:changed')
        }
    })
</script>
