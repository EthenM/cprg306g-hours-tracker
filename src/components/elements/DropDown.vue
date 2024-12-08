<template>
    <div class="flex items-center" :class="props.label ? 'gap-1' : ''">
        <label v-if="props.label" :for="props.id">{{ props.label }}</label>
        <select
            :id="props.id"
            v-model="model"
            @change="() => emits('update:changed')"
            class="bg-slate-950 rounded-lg p-2 border border-blue-950 w-full focus:bg-slate-800"
        >
            <option v-if="defaultFirstValue" :disabled="firstValueDisabled" selected></option>
            <option v-for="(option, index) in props.options"
                :disabled="!defaultFirstValue && firstValueDisabled && index == 0"
                :key="index"
                :label="option.text"
                :value="option.val"
            ></option>
        </select>
    </div>
</template>

<script setup>

    const model = defineModel()

    const emits = defineEmits(['update:changed'])

    const props = defineProps({
        options: {type: Array, default: []},
        id: {type: String, default: ''},
        label: {type: String, default: null},
        defaultFirstValue: Boolean,
        firstValueDisabled: Boolean,
    })

</script>
