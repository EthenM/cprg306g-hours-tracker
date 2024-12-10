<template>
    <header class="p-3 pt-5">
        <h2 class="text-xl">Time Entries</h2>
    </header>

    <section class="mt-5">
        <div class="w-full overflow-auto">
            <table class="relative w-full">
                <thead class="sticky border-b border-blue-950">
                    <tr>
                        <th class="border-r border-blue-950 px-2">Start Time</th>
                        <th class="border-r border-blue-950 px-2">End time</th>
                        <th class="border-r border-blue-950 px-2">Total Duration</th>
                        <th class="border-r border-blue-950 px-2">Breaks</th>
                        <th class="border-r border-blue-950 px-2">Actions</th>
                    </tr>
                </thead>
                <tbody class="border-b border-b-blue-950">
                    <tr v-for="(timeEntry, index) in timeEntries" :key="index" class="border-b border-b-blue-950">
                        <td class="p-3 border-r border-blue-950 text-center">{{ formatDate(timeEntry.startTime) }}</td>
                        <td class="p-3 border-r border-blue-950 text-center">{{ formatDate(timeEntry.endTime) }}</td>
                        <td class="p-3 border-r border-blue-950 text-center">{{ formatTimeEntryDuration(getTotalTimeSingleEntry(timeEntry)) }}</td>
                        <td class="p-3 border-r border-blue-950 text-center">
                            <p v-for="(curBreak, breakIndex) in timeEntry.breaks" :key="breakIndex"
                                :class="curBreak.invalid ? 'text-red-500 bg-red-300 rounded-lg p-1' : ''"
                                class="border-b border-b-blue-900"
                            >
                                {{ formatBreak(curBreak) }}
                            </p>
                        </td>

                        <td class="p-3">
                            <div class="flex gap-2">

                                <div class="cursor-pointer" title="Delete this entry">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="size-5"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>

                                <div class="cursor-pointer" title="Edit this entry">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="size-6"
                                    >
                                        <path
                                            d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                                        />
                                    </svg>
                                </div>

                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { getEntries } from '@/composables/TimeEntryData';
    import { useCurrentUser } from 'vuefire';
    import { formatDate, getDateDifference } from '@/composables/toolbox';

    const user = useCurrentUser()
    const timeEntries = ref([])

    onMounted(() => {
        loadData()    
    })

    const loadData = () => {

        getEntries(user.value.uid)
            .then(data => {
                timeEntries.value = data

                console.log('The data: ', timeEntries.value)
            })
    }

    const formatTimeEntryDuration = (duration) => {
        let toReturn = ""

        //add the hours
        toReturn += (duration.hours.toString().padStart(2, "0") ?? '00') + ":"
        
        //add the minutes
        toReturn += (duration.minutes.toString().padStart(2, "0") ?? '00') + ":"
        
        //add the seconds
        toReturn += (duration.seconds.toString().padStart(2, "0") ?? '00')

        return toReturn
    }

    const getTotalTimeSingleEntry = (timeEntry) => {
        //get the total time of the breaks
        const breakTime = getTotalBreakTimeSingleEntry(timeEntry.breaks)

        //get the time between the start and end
        const clockTime = getDateDifference(timeEntry.endTime, timeEntry.startTime, getDateDifference.differencesToReturn.MILLISECONDS)
        const totalDuration = getDateDifference(clockTime, breakTime, getDateDifference.differencesToReturn.ALL)
        return totalDuration
    }

    const getTotalBreakTimeSingleEntry = (breaks) => {
        return breaks.reduce((acc, curBreak) => {
            //ensure the break is valid before moving on
            if (curBreak.startTime && curBreak.endTime) {
                //give back the accumulator with the time elapsed in the break
                return acc + (curBreak.endTime - curBreak.startTime)
            } else {
                return acc
            }
        }, 0)
    }

    const formatBreak = (curBreak) => {
        //the break is invalid if there is no start time or end time, or if the start time is 
        //greater than the end time
        curBreak.invalid = !curBreak.startTime || !curBreak.endTime || curBreak.startTime > curBreak.endTime
    
        const breakTime = getDateDifference(curBreak.endTime, curBreak.startTime, getDateDifference.differencesToReturn.ALL)

        return formatDate(curBreak.startTime) + " - " + formatDate(curBreak.endTime) + " (Total: " + formatTimeEntryDuration(breakTime) + ")"
    }

</script>
  