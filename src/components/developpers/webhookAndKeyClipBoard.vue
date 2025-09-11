<template>

    <div class="">
        <FadeInAnimation class=" h-full w-full flex items-end ">
            <div v-if="!isCopied"
                class="cursor-pointer bg-gray-100 hover:bg-gray-200 h-full w-full flex justify-center px-1 items-end rounded-sm"
                @click="copy">

                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                </svg>
            </div>

            <div v-else class="h-full w-full flex justify-center px-1 py-1  rounded-sm">

                <svg width="24" height="24" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g fill="none" fill-rule="evenodd" stroke="#000000" stroke-linecap="round"
                            stroke-linejoin="round" transform="translate(4 3)">
                            <path
                                d="m3.5 1.5c-.42139382 0-1.08806048 0-2 0-.55228475 0-1 .44771525-1 1v11c0 .5522848.44771525 1 1 1h10c.5522847 0 1-.4477152 1-1v-11c0-.55228475-.4477153-1-1-1-.8888889 0-1.55555556 0-2 0">
                            </path>
                            <path
                                d="m4.5.5h4c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-4c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z">
                            </path>
                            <path d="m3.5 8.5 2 2 5-5"></path>
                        </g>
                    </g>
                </svg>
            </div>

        </FadeInAnimation>


    </div>

</template>

<script setup lang="ts">
import { copyToClipBoard } from '@/shared/shared';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import FadeInAnimation from '../animations/fadeInAnimation.vue';

const toast = useToast();

const isCopied = ref(false);

const { dataToCopy, successMessage } = defineProps({
    dataToCopy: {
        type: String || Number,
        required: true,

    },
    successMessage: {
        type: String,
        required: false,
        default: "copie effectué"
    }
})

const copy = () => {
    copyToClipBoard(dataToCopy)
    toast.info(successMessage, { timeout: 3000 });
    isCopied.value = true;
}

watch(isCopied, (n, o) => {
    if (n) {
        setTimeout(() => {
            isCopied.value = false;
        }, 3000)
    }
})
</script>

<style scoped></style>