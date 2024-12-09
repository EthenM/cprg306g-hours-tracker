<template>
    <section class="grid gap-4 grid-cols-1 grid-rows-3 items-center h-full">

        <section v-if="entry.startTime" class="justify-self-center">
            <h2 class="text-3xl text-center mb-2">Time Elapsed</h2>

            <div class="text-5xl text-center">
                {{ timeElapsed?.hours?.toString()?.padStart(2, "0") ?? "00" }} :
                {{ timeElapsed?.minutes?.toString()?.padStart(2, "0") ?? "00" }} :
                {{ timeElapsed?.seconds?.toString()?.padStart(2, "0") ?? "00" }}
            </div>
        </section>

        <StartButton class="justify-self-center row-start-2" :clicked="clockIn"/>


        

    </section>

</template>

<script setup>
    import InitialWorkSection from '@/components/InitialWorkSection.vue';
    import StartButton from '@/components/StartButton.vue';
    import { ref } from 'vue';

    const entry = ref({
        startTime: null,
        endTime: null,
    })
    const currentTimeInterval = ref(null)
    const timeElapsed = ref(null)

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

        trackTime()
    }

    const trackTime = () => {
        //get the time between the current time and the start time
        currentTimeInterval.value = setInterval(() => {
            timeElapsed.value = getDateDifference(Date.now(), entry.value.startTime)
        }, 1000)
    }


    const getDateDifference = (newDate, oldDate) => {
        const difference = newDate - oldDate

        return {
            milliseconds: difference,
            seconds: parseInt((difference / 1000).toString()) % 60,
            minutes: parseInt((difference / (1000 * 60)).toString()) % 60,
            hours: parseInt((difference / (1000 * 60 * 60)).toString()) % 60,
            days: parseInt((difference / (1000 * 60 * 60 * 24)).toString()) % 24,
        }
    }
</script>
