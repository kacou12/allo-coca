<template>
    <Sheet>
        <SheetTrigger as-child>
            <button type="button"
                class="inline-flex items-center p-2 text-sm text-primary-50 rounded-lg hover:bg-primary-60 focus:outline-none  ">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                    </path>
                </svg>
            </button>
        </SheetTrigger>
        <SheetContent side="left" class="p-0 w-4/5 sm:w-4/3">
            <div class="h-full  flex flex-col ">

                <!-- Logo et sélection du pays -->
                <section class="p-5">
                    <div class=" mb-4">
                        <!-- <img src="" alt="Logo" class="w-10 h-10 mr-2" /> -->
                        <img :src="mini_app_icons" alt="Logo" class="  mr-2" />

                    </div>

                    <!-- Bouton sélection du pays -->
                    <!-- <CountrySelect></CountrySelect> -->

                    <hr class="mt-3">
                </section>

                <!-- menus -->
                <section class="">

                    <main class=" flex-1 flex flex-col justify-between">
                        <!-- Menu principal deroulant -->
                        <section class="px-5 pb-4 pt-2  ">
                            <p class="text-xs font-medium text-neutral-30 mb-2.5">PRINCIPAL</p>
                            <ul class="space-y-2 font-medium ">
                                <li class="items-center flex ">

                                    <SheetClose class="w-full">
                                        <router-link :to="{ name: AppRoute.HOME.name }"
                                            class="flex items-center p-2 w-full  rounded-lg">Accueil</router-link>
                                    </SheetClose>

                                </li>
                                <li class="items-center flex ">

                                    <SheetClose class="w-full">
                                        <router-link :to="{ name: AppRoute.LOGIN.name }"
                                            class="flex items-center p-2 w-full  rounded-lg">Connexion</router-link>
                                    </SheetClose>

                                </li>
                                <li class="items-center flex ">

                                    <SheetClose class="w-full">
                                        <router-link :to="{ name: AppRoute.PRODUCTS.name }"
                                            class="flex items-center p-2 w-full  rounded-lg">Commander</router-link>
                                    </SheetClose>

                                </li>
                                <li class="items-center flex ">

                                    <SheetClose class="w-full">
                                        <router-link :to="{ name: AppRoute.ORDERS.name }"
                                            class="flex items-center p-2 w-full  rounded-lg">Mes commandes</router-link>
                                    </SheetClose>

                                </li>
                                <li class="items-center flex ">
                                    <SheetClose class="w-full">
                                        <a href="#" @click.prevent="routeAndScrollTo('contact-us')"
                                            class="flex items-center p-2 w-full  rounded-lg 
                                            hover:ml-1
                                            relative
                                            overflow-hidden
                                        hover:text-primary-50 transition-all duration-500 group cursor-pointer text-neutral-20">
                                            <span class=" ml-3 text-sm text-left">Contactez nous</span>
                                        </a>
                                    </SheetClose>

                                </li>


                            </ul>
                        </section>




                    </main>

                </section>


            </div>


        </SheetContent>

    </Sheet>
</template>

<script setup lang="ts">
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet';
import { AppRoute } from '@/constants/app-route';

import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
const mini_app_icons = new URL("/src/assets/allococa/logo-allo-coca-red.png", import.meta.url).href;


const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        // element.scrollIntoView({ behavior: 'smooth' });
    }
};

const router = useRouter();
const route = useRoute();

const routeAndScrollTo = (id: string) => {
    if (route.name !== AppRoute.HOME.name) {
        router.push({ path: "/", hash: `#${id}`, });

    } else {
        scrollTo(id);
    }
};


const selectedCountry = ref({
    name: "Côte d`Ivoire",
    flag: "https://flagcdn.com/w320/ci.png", // Drapeau par défaut
});

const isOpen = ref(false);

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};
const selectCountry = (country: {
    name: string;
    flag: string;
}) => {
    selectedCountry.value = country;
    isOpen.value = false;
};



</script>

<style scoped></style>