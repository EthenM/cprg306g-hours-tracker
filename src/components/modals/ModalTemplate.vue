<template>
    <teleport to="body">
        <div v-if="modalOpen"
            class="fixed top-0 left-0 w-screen h-screen bg-gray-700/70 flex justify-center items-center"
            @click="closeModal"
        >
            <div class="top-1/2 left-1/2 max-h-screen bg-slate-950 rounded-lg" @click.stop>

                <header class="border-b border-blue-950 p-3">
                    <slot name="header">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl">Modal header</h2>
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
                    </slot>
                </header>

                <section>
                    <slot name="content"></slot>
                </section>

                <footer class="border-t border-blue-950 p-3">
                    <slot name="footer">
                        <div class="w-full flex justify-end items-center">
                            <button @click="closeModal">Close</button>
                        </div>
                    </slot>
                </footer>
            </div>
    
        </div>
    </teleport>
</template>

<script setup>


    const modalOpen = defineModel('modalOpen')

    const closeModal = () => {
        modalOpen.value = false
    }

</script>
