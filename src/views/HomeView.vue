<template>
    <section class="grid gap-4 grid-cols-1 grid-rows-3 items-center h-full">

        <section v-if="entry.startTime" class="justify-self-center">
            <h2 class="text-3xl text-center mb-2">{{ !onBreak ? 'Time Elapsed' : 'On Break For'}}</h2>

            <div class="text-5xl text-center">
                {{ timeElapsed?.hours?.toString()?.padStart(2, "0") ?? "00" }} :
                {{ timeElapsed?.minutes?.toString()?.padStart(2, "0") ?? "00" }} :
                {{ timeElapsed?.seconds?.toString()?.padStart(2, "0") ?? "00" }}
            </div>
        </section>

        <StartButton v-if="!entry.startTime" class="justify-self-center row-start-2" :clicked="clockIn"/>

        <EntryButtons v-else
            v-model:onBreak="onBreak"
            :pause-button-clicked="handlePauseBtnClick"
            :stop-button-clicked="handleStopBtnClick"

            class="justify-self-center row-start-2"
        />

        

    </section>

</template>

<script setup>
    import EntryButtons from '@/components/EntryButtons.vue';
    import StartButton from '@/components/StartButton.vue';
    import { addEntry } from '@/composables/TimeEntryData';
    import { computed, ref } from 'vue';
    import { useCurrentUser } from 'vuefire';
    import { getDateDifference } from '@/composables/toolbox';

    const entry = ref({
        startTime: null,
        endTime: null,
        breaks: []
    })
    const currentTimeInterval = ref(null)
    const onBreak = ref(false)
    const timeElapsed = ref(null)
    const user = useCurrentUser()

    //helping out with showing the date
    const totalBreak = computed({
        get() {
            if (entry.value.breaks.length == 0) {
                //no breaks, return 0
                return 0
            } else {
                //there are breaks, reduce it to the total number of milliseconds
                return entry.value.breaks.reduce((acc, curBreak) => {
                    const breakStart = curBreak.startTime
                    const breakEnd = curBreak.endTime

                    if (!breakStart) {
                        //the break is invalid, just return the accumulator
                        return acc
                    } else {
                        //return the accumulator plus the difference between the start and end of the break
                        return acc + getDateDifference(
                            breakEnd ? breakEnd : Date.now(),
                            breakStart,
                            getDateDifference.differencesToReturn.MILLISECONDS
                        )
                    }
                }, 0)
            }
        }
    })

    /**
     * TODO:
     * - when the start button is clicked, get the current time. This is the first step to ensure that the time
     *   starts counting as close to the button click as possible.
     * - take the values from the initial work section. This should work on any amount of this added.
     *      - create a new sub-entry based on the work section. It will be used to determine the time for each project
     *        and company later.
     * - swap the start button over for the break and end buttons.
     * - swap the initialWorkSection over for the elapsed time.
     * - add the work sections to the container at the bottom of the screen.
     */


    const clockIn = () => {
        //clear any intervals, if there were
        if (currentTimeInterval.value) {
            clearInterval(currentTimeInterval.value)
        }

        //set the entry's start time to the current time
        entry.value.startTime = Date.now()

        //store the entry in local storage, that way the app can persist a clock in
        //while being closed.
        localStorage.setItem('tl_current_entry', JSON.stringify(entry.value))

        //set up the interval to update the screen with the amount of time elapsed.
        trackTime()
    }

    const trackTime = () => {
        //get the time between the current time and the start time
        currentTimeInterval.value = setInterval(() => {
            //check the total break time

            //get the total difference if the user is not on a break
            if (!onBreak.value) {
                const difference = getDateDifference(Date.now(), entry.value.startTime, getDateDifference.differencesToReturn.MILLISECONDS)
                timeElapsed.value = getDateDifference(difference, totalBreak.value, getDateDifference.differencesToReturn.ALL)
            } else {
                //get the difference in time for the break if the user is on one.
                console.log(entry.value.breaks)
                timeElapsed.value = getDateDifference(
                    Date.now(),
                    entry.value.breaks.find(item => !item.endTime)?.startTime,
                    getDateDifference.differencesToReturn.ALL
                )
            }
        }, 1000)
    }

    const handlePauseBtnClick = () => {
        //if the user is currently on break, find the item with no end time, and add the current time to that break
        //if the user isn't currently on break, create a new break with the start time as the current time.
        if (onBreak.value) {
            const curBreak = entry.value.breaks.find(item => !item.endTime)
            curBreak.endTime = Date.now()
            onBreak.value = false
        } else {
            onBreak.value = true
            entry.value.breaks.push({startTime: Date.now(), endTime: null})
        }

        //clear the timeElapsed
        timeElapsed.value = null
    }

    const handleStopBtnClick = () => {
        entry.value.endTime = Date.now()

        //If the user was currently on a break, ensure it's endTime is set to the endTime of the entry.
        if (onBreak.value) {
            entry.value.breaks.find(item => !item.endTime).endTime = entry.value.endTime
        }

        addEntry(user.value.uid, entry.value)
            .then(response => {
                console.log(entry.value)
                //clear out the entry stored in local storage.
                localStorage.removeItem('tl_current_entry')
                clearInterval(currentTimeInterval.value)
                timeElapsed.value = null
            })
            .catch(err => {
                console.log("ERROR: handleStopBtnClick: " + err)
            })
    }

</script>
