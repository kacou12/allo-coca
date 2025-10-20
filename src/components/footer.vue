<template>
    <div class="bg-black py-[50px]">
        <div class="maxContain3xl  ">

            <article class=" flex flex-col lg:flex-row lg:justify-between lg:   items-start mb-16 ">
                <section class=" space-y-8">
                    <RouterLink to="/">
                        <img src="/src/assets/allococa/logo-allo-coca.png" alt="Logo" />
                    </RouterLink>
                    <div class="2xl:w-[50%]">

                        <p class="text-white">AlloCoca.ci - Ton service préféré de livraison de boissons à Abidjan. T'as
                            soif ? Clique, on arrive.
                        </p>
                    </div>

                    <div class="flex items-center gap-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_12539_12111)">
                                <path
                                    d="M17.0725 -0.00878906H13.0278V16.339C13.0278 18.2869 11.4722 19.8869 9.53626 19.8869C7.60034 19.8869 6.04469 18.2869 6.04469 16.339C6.04469 14.426 7.56577 12.8607 9.43257 12.7912V8.68688C5.31872 8.75641 2 12.1303 2 16.339C2 20.5825 5.38786 23.9912 9.57085 23.9912C13.7538 23.9912 17.1416 20.5477 17.1416 16.339V7.95641C18.6627 9.06948 20.5295 9.73034 22.5 9.76514V5.66078C19.4579 5.55643 17.0725 3.05208 17.0725 -0.00878906Z"
                                    fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_12539_12111">
                                    <rect width="24" height="24" fill="white" transform="translate(0 -0.00878906)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_12539_12113)">
                                <path
                                    d="M24 11.9912C24 5.36379 18.6274 -0.00878906 12 -0.00878906C5.37258 -0.00878906 0 5.36379 0 11.9912C0 17.9807 4.3882 22.9452 10.125 23.8454V15.46H7.07812V11.9912H10.125V9.34746C10.125 6.33996 11.9166 4.67871 14.6576 4.67871C15.9701 4.67871 17.3438 4.91309 17.3438 4.91309V7.86621H15.8306C14.34 7.86621 13.875 8.79129 13.875 9.74121V11.9912H17.2031L16.6711 15.46H13.875V23.8454C19.6118 22.9452 24 17.9807 24 11.9912Z"
                                    fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_12539_12113">
                                    <rect width="24" height="24" fill="white" transform="translate(0 -0.00878906)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2.15215C15.2063 2.15215 15.5859 2.16621 16.8469 2.22246C18.0188 2.27402 18.6516 2.4709 19.0734 2.63496C19.6313 2.85059 20.0344 3.11309 20.4516 3.53027C20.8734 3.95215 21.1313 4.35059 21.3469 4.9084C21.5109 5.33027 21.7078 5.96777 21.7594 7.13496C21.8156 8.40059 21.8297 8.78027 21.8297 11.9818C21.8297 15.1881 21.8156 15.5678 21.7594 16.8287C21.7078 18.0006 21.5109 18.6334 21.3469 19.0553C21.1313 19.6131 20.8687 20.0162 20.4516 20.4334C20.0297 20.8553 19.6313 21.1131 19.0734 21.3287C18.6516 21.4928 18.0141 21.6896 16.8469 21.7412C15.5813 21.7975 15.2016 21.8115 12 21.8115C8.79375 21.8115 8.41406 21.7975 7.15313 21.7412C5.98125 21.6896 5.34844 21.4928 4.92656 21.3287C4.36875 21.1131 3.96563 20.8506 3.54844 20.4334C3.12656 20.0115 2.86875 19.6131 2.65313 19.0553C2.48906 18.6334 2.29219 17.9959 2.24063 16.8287C2.18438 15.5631 2.17031 15.1834 2.17031 11.9818C2.17031 8.77559 2.18438 8.3959 2.24063 7.13496C2.29219 5.96309 2.48906 5.33027 2.65313 4.9084C2.86875 4.35059 3.13125 3.94746 3.54844 3.53027C3.97031 3.1084 4.36875 2.85059 4.92656 2.63496C5.34844 2.4709 5.98594 2.27402 7.15313 2.22246C8.41406 2.16621 8.79375 2.15215 12 2.15215ZM12 -0.00878906C8.74219 -0.00878906 8.33438 0.00527344 7.05469 0.0615234C5.77969 0.117773 4.90313 0.324023 4.14375 0.619336C3.35156 0.928711 2.68125 1.33652 2.01563 2.00684C1.34531 2.67246 0.9375 3.34277 0.628125 4.13027C0.332812 4.89434 0.126563 5.76621 0.0703125 7.04121C0.0140625 8.32559 0 8.7334 0 11.9912C0 15.249 0.0140625 15.6568 0.0703125 16.9365C0.126563 18.2115 0.332812 19.0881 0.628125 19.8475C0.9375 20.6396 1.34531 21.31 2.01563 21.9756C2.68125 22.6412 3.35156 23.0537 4.13906 23.3584C4.90313 23.6537 5.775 23.86 7.05 23.9162C8.32969 23.9725 8.7375 23.9865 11.9953 23.9865C15.2531 23.9865 15.6609 23.9725 16.9406 23.9162C18.2156 23.86 19.0922 23.6537 19.8516 23.3584C20.6391 23.0537 21.3094 22.6412 21.975 21.9756C22.6406 21.31 23.0531 20.6397 23.3578 19.8521C23.6531 19.0881 23.8594 18.2162 23.9156 16.9412C23.9719 15.6615 23.9859 15.2537 23.9859 11.9959C23.9859 8.73809 23.9719 8.33027 23.9156 7.05059C23.8594 5.77559 23.6531 4.89902 23.3578 4.13965C23.0625 3.34277 22.6547 2.67246 21.9844 2.00684C21.3188 1.34121 20.6484 0.928711 19.8609 0.624023C19.0969 0.328711 18.225 0.122461 16.95 0.0662109C15.6656 0.00527344 15.2578 -0.00878906 12 -0.00878906Z"
                                fill="white" />
                            <path
                                d="M12 5.82715C8.59688 5.82715 5.83594 8.58809 5.83594 11.9912C5.83594 15.3943 8.59688 18.1553 12 18.1553C15.4031 18.1553 18.1641 15.3943 18.1641 11.9912C18.1641 8.58809 15.4031 5.82715 12 5.82715ZM12 15.9896C9.79219 15.9896 8.00156 14.199 8.00156 11.9912C8.00156 9.7834 9.79219 7.99277 12 7.99277C14.2078 7.99277 15.9984 9.7834 15.9984 11.9912C15.9984 14.199 14.2078 15.9896 12 15.9896Z"
                                fill="white" />
                            <path
                                d="M19.8469 5.5836C19.8469 6.38047 19.2 7.02266 18.4078 7.02266C17.6109 7.02266 16.9688 6.37578 16.9688 5.5836C16.9688 4.78672 17.6156 4.14453 18.4078 4.14453C19.2 4.14453 19.8469 4.79141 19.8469 5.5836Z"
                                fill="white" />
                        </svg>
                    </div>
                </section>
                <section class="flex flex-col sm:flex-row sm:items-center gap-14 mt-10 lg:mt-0">
                    <div class="space-y-2 ">
                        <p class="text-[14px] font-opensans text-white text-opacity-60">Liens rapides</p>
                        <article class="space-y-2 text-white">
                            <a class="hover:underline" href="#" @click.prevent="routeAndScrollTo('comment-ca-marche')">
                                Comment ça marche
                            </a>
                            <div>
                                <a class="hover:underline" href="#"
                                    @click.prevent="$router.push({ name: AppRoute.PRODUCTS.name })">
                                    Commander
                                </a>
                            </div>

                            <p>Contact</p>
                        </article>
                    </div>
                    <div class="space-y-2 ">
                        <p class="text-[14px] font-opensans text-white text-opacity-60">Légal</p>
                        <article class="space-y-2 text-white">
                            <p>Mentions légales</p>
                            <p>Politique de confidentialité</p>
                            <p>CGV</p>
                        </article>
                    </div>
                </section>

            </article>
            <article
                class="pt-8 mt-8 space-y-3  border-t-[1px] border-t-white/10 flex flex-col sm:flex-row items-center justify-between text-white">
                <p>&copy; 2025 AlloCoca.ci - Tous droits réservés</p>
                <!-- <p>Website BY THEDESIGNHERO</p> -->
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AppRoute } from '@/constants/app-route';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const windowScrollY = ref(0);

const isScrolledOrHomePage = computed(() => (router.currentRoute.value.name == AppRoute.HOME_REDIRECT.name && windowScrollY.value > 0) || router.currentRoute.value.name != AppRoute.HOME_REDIRECT.name);


const router = useRouter();

const route = useRoute();

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

</script>

<style scoped></style>