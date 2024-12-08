<template>
    <section class="grid gap-4 grid-cols-1 grid-rows-3 items-center h-full">
        

        <InitialWorkSection
            class="justify-items-center"
            
            v-model:selectedProject="selectedProject"
            v-model:workSectionDescription="workSectionDescription"
            v-model:selectedCompany="selectedCompany"

            :projectDropDownList="dropdownTest"
            :companyDropDownList="dropdownTest"

            @update:changedProject="console.log('the option: ', selectedProject)"
            @update:changedDescription="console.log('the option: ', workSectionDescription)"
            @update:changedCompany="console.log('the option: ', selectedCompany)"
        />


        <StartButton class="justify-self-center"/>


        

    </section>

</template>

<script setup>
    import InitialWorkSection from '@/components/InitialWorkSection.vue';
    import StartButton from '@/components/StartButton.vue';
    import { ref } from 'vue';

    const dropdownTest = ref([{val: '1', text: '1'},{val: '2', text: '2'}])
    const selectedProject = ref(null)
    const workSectionDescription = ref('')
    const selectedCompany = ref(null)

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

</script>
