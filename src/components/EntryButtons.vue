<template>

    <div class="flex gap-20">
        <CircleButton
            :clicked="pauseButtonClicked"
        >
            <!-- taken from https://heroicons.com/ -->

            <!-- this will be shown when the entry is running -->
            <svg v-if="!onBreak"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-32"
            >
                <path
                    fill-rule="evenodd"
                    d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" 
                    clip-rule="evenodd"
                />
            </svg>


            <!-- this will be shown when the entry is already paused -->
            <svg v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-32 relative left-1"
            >
                <path
                    fill-rule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clip-rule="evenodd"
                />
            </svg>

        </CircleButton>
        
        <CircleButton
            :clicked="stopButtonClicked"
        >
            <!-- taken from https://heroicons.com/ -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-32"
            >
                <path
                    fill-rule="evenodd"
                    d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                    clip-rule="evenodd"
                />
            </svg>

        </CircleButton>
    </div>        
    
</template>


<script setup>
    import CircleButton from './elements/CircleButton.vue';

    const onBreak = defineModel('onBreak')

    const props = defineProps({
        pauseButtonClicked: {type: Function, default: () => true},
        stopButtonClicked: {type: Function, default: () => true}
    })

</script>
