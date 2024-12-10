<template>
    <td class="p-2 border-x border-blue-950">
        <!-- start date/time -->
        <div>
            <CustomInput
                v-model="startDate"
                id="startDateInput"
                label="Start&nbsp;Date:"
                class="mb-2"
                type="date"
            />

            <CustomInput
                v-model="startTime"
                id="startTimeInput"
                label="Start&nbsp;Time:"
                type="time"
            />


        </div>
    </td>
    
    <td class="p-2 border-x border-blue-950">
        <!-- end date/time -->
        <div>
            <CustomInput
                v-model="endDate"
                id="endDateInput"
                label="End&nbsp;Date:"
                class="mb-2"
                type="date"
            />

            <CustomInput
                v-model="endTime"
                id="endTimeInput"
                label="End&nbsp;Time:"
                type="time"
            />
        </div>
    </td>

    <td class="border-x border-blue-950">
        <div class="flex justify-center items-center">
            <button @click="emits('delete', rowIndex)" title="delete this break">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-5 transition-all hover:size-6"
                >
                    <path
                        fill-rule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </td>
</template>

<script setup>
    import { appendTimezone, formatDate, validTime } from '@/composables/toolbox';
    import { watch, ref, computed } from 'vue';
    import CustomInput from './elements/CustomInput.vue';


    const emits = defineEmits(['update:changed', 'delete'])

    const props = defineProps({
        thisBreak: {type: Object, default: null},
        rowIndex: {type: Number, default: null}
    })

    const thisBreak = ref({
        startTime: null,
        endTime: null,
    })

    watch(() => props.thisBreak, () => {
        console.log("here???", props.thisBreak)
        thisBreak.value = {...(props.thisBreak)}
    }, {
        deep: true,
        immediate: true
    })

    const startDate = computed({
        get() {
            const start = formatDate(thisBreak.value.startTime, formatDate.format.TWENTY_FOUR)?.split(" ")
            
            if (start?.length > 0) {
                return start[0]
            }
        },
        set(value) {


            if(validTime(startTime.value)) {
                
                const startDate = thisBreak.value.startTime
                const startTimeSection = formatDate(startDate, formatDate.format.TWENTY_FOUR)?.split(" ")[1]
                
                thisBreak.value.startTime = new Date(appendTimezone(value + " " + startTimeSection))
            } else {
                //default to midnight
                thisBreak.value.startTime = new Date(appendTimezone(value + " 00:00:00"))
            }
                
                //send the updated break back to the main table.
                emits('update:changed', thisBreak.value, props.rowIndex)
        }
    })

    const startTime = computed({
        get() {
            const start = formatDate(thisBreak.value.startTime, formatDate.format.TWENTY_FOUR)?.split(" ")
            
            if (start?.length > 0) {
                return start[1]
            }
        },
        set(value) {

            //ensure the start date is already set.
            if (isNaN(new Date(startDate.value))) {
                alert("The start date must be set before the start time can be set.")

                console.log(startDate.value)
            } else {

                const start = thisBreak.value.startTime
                const startDateSection = formatDate(start, formatDate.format.TWENTY_FOUR)?.split(" ")[0]
    
                thisBreak.value.startTime = new Date(appendTimezone(startDateSection + " " + value))
    
                //send the updated break back to the main table.
                emits('update:changed', thisBreak.value, props.rowIndex)
            }
        }
    })

    const endDate = computed({
        get() {
            const end = formatDate(thisBreak.value.endTime, formatDate.format.TWENTY_FOUR)?.split(" ")
            
            if (end?.length > 0) {
                return end[0]
            }
        },
        set(value) {

            if (validTime(endTime.value)) {
                const endDate = thisBreak.value.endTime
                const endTime = formatDate(endDate, formatDate.format.TWENTY_FOUR)?.split(" ")[1]
    
                thisBreak.value.endTime = new Date(appendTimezone(value + " " + endTime))
            } else if (validTime(startTime.value)) {
                //default to start time
                thisBreak.value.endTime = new Date(appendTimezone(value + " " + startTime.value))
            } else {
                //default to midnight
                thisBreak.value.endTime = new Date(appendTimezone(value + " 00:00:00"))
            }

            //send the updated break back to the main table.
            emits('update:changed', thisBreak.value, props.rowIndex)
        }
    })

    const endTime = computed({
        get() {
            const end = formatDate(thisBreak.value.endTime, formatDate.format.TWENTY_FOUR)?.split(" ")
            
            if (end?.length > 0) {
                return end[1]
            }
        },
        set(value) {

            //ensure the end date is already set.
            if (isNaN(new Date(endDate.value))) {
                alert("The end date must be set before the end time can be set.")
            } else {

                const end = thisBreak.value.endTime
                const endDateSection = formatDate(end, formatDate.format.TWENTY_FOUR)?.split(" ")[0]
    
                thisBreak.value.endTime = new Date(appendTimezone(endDateSection + " " + value))
    
                //send the updated break back to the main table.
                emits('update:changed', thisBreak.value, props.rowIndex)
            }
        }
    })
</script>
