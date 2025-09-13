<template>
    <div class="flex items-center grow bg-purple-500 p-4">

        <section class="flex-1 flex justify-center items-center ">
            <div class="relative bg-emerald-900">
                <!-- <div class="absolute top-[32px] left-[25px]   grid grid-cols-6 gap-2"> -->
                <div class="absolute top-[7%] left-[6%] lg:left-[4.7%]   grid grid-cols-6 gap-2">
                    <!-- capsule -->
                    <section v-for="i in 19" class=" border-2 col-span-1 max-h-[40px] lg:max-h-[80px]">
                        <img class="w-full h-full object-cover"
                            src="@/assets/allococa/products/capsules/coca-capsule.png/" alt="">
                    </section>
                </div>
                <img src="@/assets/allococa/locker.png" alt="">
            </div>
            <!-- 83 -->
        </section>
        <section class="w-[452px] h-[calc(100vh-180px)] bg-green-400 relative">
            <!-- configuration du casier -->
            <article class="absolute bottom-0 left-0 right-0 bg-yellow-900 h-[calc(100vh-95px)] w-full">
                <ProductConfigurator></ProductConfigurator>
            </article>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductConfigurator from './productConfigurator.vue';


const casierProducts = ref(7);

</script>

<style scoped></style>