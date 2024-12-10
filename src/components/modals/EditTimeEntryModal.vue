<template>
    <ModalTemplate v-model:modalOpen="modalOpen">
        
        <!-- modal header -->
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl">Edit Entry</h2>
                <button @click="closeModal">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-5 transition-all hover:size-6"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </template>

        <!-- modal content -->
        <template #content>
            <div class="grid grid-cols-2 p-3 gap-5 gap-x-10">
                <!-- the id. This will not be editable -->
                <div class="col-span-2 justify-self-center">
                    <CustomInput
                        v-model="props.entry.id"
                        id="entryId"
                        label="Entry&nbsp;Id:"
                        disabled
                        class="w-fit"
                    />
                </div>

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
            </div>

            <div class="mt-5 p-5">
                <header class="grid grid-cols-3 grid-rows-1 mb-3">
                    <h3 class="text-xl text-center col-start-2">Breaks</h3>
                    <div class="flex justify-end items-center">
                        <button
                            class="w-fit px-2 py-1 border border-blue-950 rounded-lg transition-colors ease-in-out"
                            :class="changeBreakBtnColour
                                ? 'bg-green-300 hover:bg-green-300 active:bg-green-300'
                                : 'bg-slate-800 hover:bg-slate-900 active:bg-slate-950'"
                            :disabled="changeBreakBtnColour"
                            @click="addNewBreak"
                        >
                            Add New
                        </button>
                    </div>
                </header>
                
                <div class="w-full overflow-x-hidden overflow-y-auto max-h-40">
                    <table class="relative w-full">
                        <thead class="border-b border-blue-950">
                            <tr>
                                <th class="border-x border-blue-950 px-2">Start</th>
                                <th class="border-x border-blue-950 px-2">End</th>
                                <th class="border-x border-blue-950 px-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(curBreak, index) in entryToEdit.breaks" :key="index" class="border-b border-blue-950">
                                <BreakRow :thisBreak="curBreak" :rowIndex="index" @update:changed="updateBreak" @delete="deleteBreak"/>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </template>

        <!-- modal footer -->
        <template #footer>
            <div class="flex justify-end gap-3">
                <button
                    class="bg-slate-800 hover:bg-slate-900 active:bg-slate-950 border border-blue-950 rounded-lg py-1 px-2"
                    @click="saveChanges"
                >
                    Save Changes
                </button>
                <button
                    class="bg-slate-800 hover:bg-slate-900 active:bg-slate-950 border border-blue-950 rounded-lg py-1 px-2"
                    @click="closeModal"
                >
                    Cancel
                </button>
            </div>
        </template>
    </ModalTemplate>
</template>

<script setup>
    import { computed, ref, watch, watchEffect } from 'vue';
    import CustomInput from '../elements/CustomInput.vue';
    import ModalTemplate from './ModalTemplate.vue';
    import { appendTimezone, formatDate } from '@/composables/toolbox';
    import { updateEntry } from '@/composables/TimeEntryData';
    import { useCurrentUser } from 'vuefire';
    import BreakRow from '../BreakRow.vue';

    const modalOpen = defineModel('modalOpen')

    const emits = defineEmits(['entryUpdated'])

    const props = defineProps({
        entry: {type: Object, default: null},
    })

    const user = useCurrentUser()
    const changeBreakBtnColour = ref(false)
    const entryToEdit = ref({
        id: null,
        startTime: null,
        endTime: null,
        breaks: []
    })

    const startDate = computed({
        get() {
            const start = formatDate(entryToEdit.value.startTime, formatDate.format.TWENTY_FOUR)?.split(" ")
            
            return start[0]
        },
        set(value) {

            const startDate = entryToEdit.value.startTime instanceof Date && entryToEdit.value.startTime
            console.log(startDate)
            const startTime = formatDate(startDate, formatDate.format.TWENTY_FOUR)?.split(" ")[1]


            entryToEdit.value.startTime = new Date(appendTimezone(value + " " + startTime))
            console.log(value, startTime, entryToEdit.value.startTime)
        }
    })

    const startTime = computed({
        get() {
            const start = formatDate(entryToEdit.value.startTime, formatDate.format.TWENTY_FOUR)?.split(" ")
            
            return start[1]
        },
        set(value) {
            const start = entryToEdit.value.startTime
            const startDate = formatDate(start, formatDate.format.TWENTY_FOUR)?.split(" ")[0]

            entryToEdit.value.startTime = new Date(appendTimezone(startDate + " " + value))
            console.log(value, startDate, entryToEdit.value.startTime)
        }
    })

    const endDate = computed({
        get() {
            const end = formatDate(entryToEdit.value.endTime, formatDate.format.TWENTY_FOUR)?.split(" ")
            
            return end[0]
        },
        set(value) {
            const endDate = entryToEdit.value.endTime instanceof Date && entryToEdit.value.endTime
            const endTime = formatDate(endDate, formatDate.format.TWENTY_FOUR)?.split(" ")[1]

            entryToEdit.value.endTime = new Date(appendTimezone(value + " " + endTime))
            console.log(value, endTime, entryToEdit.value.endTime)
        }
    })

    const endTime = computed({
        get() {
            const end = formatDate(entryToEdit.value.endTime, formatDate.format.TWENTY_FOUR)?.split(" ")
            
            return end[1]
        },
        set(value) {
            const end = entryToEdit.value.endTime
            const endDate = formatDate(end, formatDate.format.TWENTY_FOUR)?.split(" ")[0]

            entryToEdit.value.endTime = new Date(appendTimezone(endDate + " " + value))
            console.log(value, endDate, entryToEdit.value.endTime)
        }
    })

    /**@enum */
    const timeStarted = Object.freeze({
        START: 1,
        END: 2,
    })

    /**@enum */
    const dateType = Object.freeze({
        DATE: 1,
        TIME: 2,
    })


    watch(() => modalOpen.value, () => {
        if (modalOpen.value) {
            entryToEdit.value = {...(props.entry)}

            entryToEdit.value.startTime = new Date(entryToEdit.value.startTime)
            entryToEdit.value.endTime = new Date(entryToEdit.value.endTime)

            entryToEdit.value.breaks = entryToEdit.value.breaks.map(curBreak => {
                const newBreak = {
                    startTime: new Date(curBreak.startTime),
                    endTime: new Date(curBreak.endTime)
                }

                return newBreak
            })

            console.dir(entryToEdit.value)
        }
    })

    const addNewBreak = () => {
        entryToEdit.value.breaks.push({startTime: null, endTime: null})

        changeBreakBtnColour.value = true
        setTimeout(() => {
            changeBreakBtnColour.value = false
        }, 1000);
    }

    const updateBreak = (breakToUpdate, rowIndex) => {
        console.log("break is updating.")
        entryToEdit.value.breaks[rowIndex] = {...(breakToUpdate)}
    }

    const deleteBreak = (rowIndex) => {
        const ensureDelete = confirm("Are you sure you want to delete this break?")

        if (ensureDelete) {
            entryToEdit.value.breaks.splice(rowIndex, 1)
        }
    }


    const removeEmptyBreaks = () => {
        entryToEdit.value.breaks = entryToEdit.value.breaks
            .filter(curBreak => curBreak.startTime && curBreak.endTime)
    }

    const saveChanges = () => {
        //remove any empty breaks before updating the entry.
        removeEmptyBreaks()

        console.log(entryToEdit.value)

        updateEntry(user.value.uid, entryToEdit.value)
            .then(response => {
                //send the entry off to the main page to be updated.
                emits('entryUpdated', {...(entryToEdit.value)})
                alert("Entry updated successfully!")
            })
            .catch(err => {
                console.error("ERROR: saveChanges: " + err)
            })
    }

    const closeModal = () => {
        modalOpen.value = false
        //other cleanup stuff here
        entryToEdit.value = {
            id: null,
            startTime: null,
            endTime: null,
            breaks: []
        }
    }

</script>
