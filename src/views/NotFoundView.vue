<template>
    <section class="min-h-screen bg-white flex items-center justify-center py-10">
        <div class="container mx-auto px-4">
            <div class="flex justify-center">
                <div class="w-full lg:w-3/4 xl:w-2/3 text-center">
                    <h1 class="text-8xl font-bold text-center text-gray-700">404</h1>
                    <div class="h-96 bg-center bg-no-repeat flex items-center justify-center"
                        style="background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);">
                    </div>

                    <div class="mt-[-50px] relative z-10">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                            Look like you're lost
                        </h3>

                        <p class="text-lg text-gray-600 mb-8">
                            The page you are looking for is not available!
                        </p>

                        <CommonButton @action="() => { $router.push({ name: AppRoute.LOGIN.name }) }" type="default"
                            title="Retour a l'accueil">
                        </CommonButton>
                        <!-- 
                        <a href="/"
                            class="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out">
                            Go to Home
                        </a> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import { AppRoute } from '@/constants/app-route';

</script>

<style scoped>
/* No custom CSS needed here as Tailwind handles it */
</style>