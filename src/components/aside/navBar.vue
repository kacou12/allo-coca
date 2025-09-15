<template>
    <div :class="{ 'bg-white shadow-md': isScrolledOrHomePage }"
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-screen">
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
                    class="relative rounded-full border-[1px] p-2 border-white flex items-center justify-center ">

                    <CartSheet></CartSheet>

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
import { useCart } from "@/composables/queries/useCart";
import { storeToRefs } from "pinia";
import CartSheet from "../allococa/cart/cartSheet.vue";

const { cartQuantityLength } = storeToRefs(useCart());

const windowScrollY = ref(0);

const handleScroll = () => {
    windowScrollY.value = window.scrollY;
};
const router = useRouter();

const isScrolledOrHomePage = computed(() => (router.currentRoute.value.name == AppRoute.HOME_REDIRECT.name && windowScrollY.value > 0) || router.currentRoute.value.name != AppRoute.HOME_REDIRECT.name);

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});


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