<template>
    <div class="z-50 fixed top-0 left-0 right-0 flex justify-between items-center maxContain3xl">
        <div class="block lg:hidden">
            <!-- <DrawerSheet class=""></DrawerSheet> -->
        </div>

        <header class="w-full lg:flex items-center justify-between h-[80px]  ">
            <section class="hidden lg:flex items-center ">
                <RouterLink to="/">
                    <img src="@/assets/allococa/logo-allo-coca.png" alt="Logo" />
                </RouterLink>
            </section>

            <section class=" hidden flex-1  lg:flex justify-center gap-8 items-center ">
                <a class="text-white" href="#" @click.prevent="scrollTo('services')">
                    Comment ca marche ?
                </a>
                <RouterLink to="/" class="text-white">Commander</RouterLink>
                <a class="text-white" href="#" @click.prevent="scrollTo('services')">
                    Contactez-nous
                </a>
            </section>

            <section class="rounded-full border-[1px] p-2 border-white flex items-center justify-center ">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_13510_633)">
                        <path
                            d="M1.7085 1.70831H3.37516L5.59183 12.0583C5.67314 12.4374 5.88405 12.7762 6.18826 13.0165C6.49246 13.2568 6.87092 13.3836 7.2585 13.375H15.4085C15.7878 13.3744 16.1556 13.2444 16.451 13.0065C16.7465 12.7686 16.9519 12.4371 17.0335 12.0666L18.4085 5.87498H4.26683M7.50016 17.5C7.50016 17.9602 7.12707 18.3333 6.66683 18.3333C6.20659 18.3333 5.8335 17.9602 5.8335 17.5C5.8335 17.0397 6.20659 16.6666 6.66683 16.6666C7.12707 16.6666 7.50016 17.0397 7.50016 17.5ZM16.6668 17.5C16.6668 17.9602 16.2937 18.3333 15.8335 18.3333C15.3733 18.3333 15.0002 17.9602 15.0002 17.5C15.0002 17.0397 15.3733 16.6666 15.8335 16.6666C16.2937 16.6666 16.6668 17.0397 16.6668 17.5Z"
                            stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_13510_633">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

            </section>
        </header>
    </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/buttons/customButton.vue";
import { useWindowSize } from "@vueuse/core";
import { ref } from 'vue';
import DrawerSheet from "../dropdowns/drawer-sheet.vue";
import { AppRoute } from "@/constants/app-route";
import { useRouter } from 'vue-router';

const router = useRouter();

const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Element with id "${id}" not found.`);
    }
};

const phone = ref();

const { width, } = useWindowSize();


interface Props {
    logoSrc?: string
    logoAlt?: string
}

const props = withDefaults(defineProps<Props>(), {
    logoSrc: '/logo.svg',
    logoAlt: 'SendChap Logo'
})


</script>