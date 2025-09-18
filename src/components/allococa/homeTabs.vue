<template>
    <CommonCocaTabs v-model="cartTabValue" :tabs="[
        { value: 'juice', label: 'Boissons gazeuse' },
        { value: 'water', label: 'Eaux minérales' },
    ]">
        <template #juice>
            <!-- <div class="grid grid-cols-4 gap-4">
                <WaterCard></WaterCard>
                <WaterCard></WaterCard>
                <WaterCard></WaterCard>
                <WaterCard></WaterCard>
            </div> -->
            <BeverageCarousel class=""></BeverageCarousel>
        </template>
        <template #water>
            <!-- <div class="lg:grid grid-cols-4 gap-4 hidden">
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
            </div> -->

            <WaterCardCarousel class=""></WaterCardCarousel>

        </template>


    </commonCocaTabs>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import BeverageCard from './card/beverageCard.vue';
import CommonCocaTabs from './card/commonCocaTabs.vue';
import WaterCard from './card/waterCard.vue';
import BeverageCarousel from './beverageCarousel.vue';
import WaterCardCarousel from './waterCardCarousel.vue';

const cartTabValue = ref<"juice" | "water">("juice")

</script>
