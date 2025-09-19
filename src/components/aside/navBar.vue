<template>
    <div :class="{ 'bg-white shadow-md': isScrolledOrHomePage }"
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-screen">
        <section class="flex justify-between items-center maxContain3xl ">
            <div class="lg:hidden flex gap-5 items-center">
                <DrawerSheet class=""></DrawerSheet>
                <section class="">
                    <RouterLink to="/">
                        <img v-if="!isScrolledOrHomePage" class="text-primary-50 min-w-10 w-20 "
                            src="@/assets/allococa/logo-allo-coca.svg" alt="Logo" />
                        <img v-else class="text-primary-50 min-w-10 " src="@/assets/allococa/logo-allo-coca-red.png"
                            alt="Logo" />
                    </RouterLink>
                </section>
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

                    <RouterLink :to="{ name: AppRoute.HOME.name }"
                        :class="[isScrolledOrHomePage ? 'text-black' : 'text-white']">Accueil
                    </RouterLink>

                    <!-- <RouterLink :to="{ name: AppRoute.LOGIN.name }"
                        :class="[isScrolledOrHomePage ? 'text-black' : 'text-white']">Connexion
                    </RouterLink> -->

                    <RouterLink :to="{ name: AppRoute.PRODUCTS.name }"
                        :class="[isScrolledOrHomePage ? 'text-black' : 'text-white']">Commander
                    </RouterLink>

                    <RouterLink :to="{ name: AppRoute.ORDERS.name }"
                        :class="[isScrolledOrHomePage ? 'text-black' : 'text-white']">Mes commandes
                    </RouterLink>

                    <a :class="[isScrolledOrHomePage ? 'text-black' : 'text-white']" href="#"
                        @click.prevent="routeAndScrollTo('comment-ca-marche')">
                        Comment ça marche
                    </a>
                </section>

                <div class="hidden lg:flex items-center gap-5">

                    <CartSheet :is-scrolled="isScrolledOrHomePage"></CartSheet>
                    <section :class="[isScrolledOrHomePage ? 'bg-primary-50' : 'bg-transparent']"
                        class="rounded-full border-[1px] p-[4px] cursor-pointer"
                        @click="router.push({ name: AppRoute.LOGIN.name })">

                        <User2Icon :class="[isScrolledOrHomePage ? 'text-white' : 'text-white']" :stroke-width="1"
                            :size="28"></User2Icon>
                    </section>
                </div>
            </header>

            <div class="flex items-center gap-2 lg:hidden">

                <CartSheet :is-scrolled="isScrolledOrHomePage"></CartSheet>

                <!-- :class="[isScrolledOrHomePage ? 'text-black' : 'text-white']" -->
                <section :class="[isScrolledOrHomePage ? 'bg-primary-50' : 'bg-transparent']"
                    class="rounded-full border-[1px] p-[4px] cursor-pointer"
                    @click="router.push({ name: AppRoute.LOGIN.name })">

                    <User2Icon :class="[isScrolledOrHomePage ? 'text-white' : 'text-white']" :stroke-width="1"
                        :size="28"></User2Icon>
                </section>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useWindowSize, } from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useScroll } from '@vueuse/core'
import { UserCircle2, User2Icon } from 'lucide-vue-next';

import { AppRoute } from "@/constants/app-route";
import { useCart } from "@/composables/queries/useCart";
import { storeToRefs } from "pinia";
import CartSheet from "../allococa/cart/cartSheet.vue";
import DrawerSheet from "../dropdowns/drawer-sheet.vue";

const { cartQuantityLength } = storeToRefs(useCart());

const windowScrollY = ref(0);

const handleScroll = () => {
    windowScrollY.value = window.scrollY;
};
const router = useRouter();

const route = useRoute();

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

const routeAndScrollTo = (id: string) => {
    if (route.name !== AppRoute.HOME_REDIRECT.name) {
        router.push({ name: AppRoute.HOME_REDIRECT.name, hash: `#${id}`, });

    } else {
        scrollTo(id);
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