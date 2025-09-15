<template>
    <div :class="{ 'bg-white shadow-md': isScrolledOrHomePage }"
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ">
        <section class="flex justify-between items-center maxContain3xl">
            <div class="block lg:hidden">
                <!-- <DrawerSheet class=""></DrawerSheet> -->
            </div>

            <header class="w-full lg:flex items-center justify-between h-[80px]  ">
                <section class="hidden lg:flex items-center ">
                    <RouterLink to="/">
                        <img v-if="!isScrolledOrHomePage" class="text-primary-50"
                            src="@/assets/allococa/logo-allo-coca.svg" alt="Logo" />
                        <img v-else class="text-primary-50" src="@/assets/allococa/logo-allo-coca-red.png" alt="Logo" />
                    </RouterLink>
                </section>

                <section class=" hidden flex-1  lg:flex justify-center gap-8 items-center ">
                    <a :class="[isScrolledOrHomePage ? 'text-black' : 'text-white']" href="#"
                        @click.prevent="scrollTo('services')">
                        Comment ca marche ?
                    </a>
                    <RouterLink to="/" :class="[isScrolledOrHomePage ? 'text-black' : 'text-white']">Commander
                    </RouterLink>
                    <a :class="[isScrolledOrHomePage ? 'text-black' : 'text-white']" href="#"
                        @click.prevent="scrollTo('services')">
                        Contactez-nous
                    </a>
                </section>

                <section :class="[isScrolledOrHomePage ? 'bg-primary-50 border-primary-50' : 'border-white']"
                    class="rounded-full border-[1px] p-2 border-white flex items-center justify-center ">
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
        </section>
    </div>
</template>

<script setup lang="ts">
import { useWindowSize, } from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useScroll } from '@vueuse/core'
import { AppRoute } from "@/constants/app-route";

const windowScrollY = ref(0);

const handleScroll = () => {
    windowScrollY.value = window.scrollY;
};

const isScrolledOrHomePage = computed(() => windowScrollY.value > 0 || router.currentRoute.value.name != AppRoute.HOME.name);

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

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