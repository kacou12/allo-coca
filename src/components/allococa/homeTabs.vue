<template>
    <CommonCocaTabs v-model="cartTabValue" :tabs="[
        { value: 'water', label: 'Boissons gazeuse' },
        { value: 'juice', label: 'Eaux minérales' },
    ]">
        <template #water>
            <div class="grid grid-cols-4 gap-4">
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
            </div>
        </template>
        <template #juice>
            <div class="grid grid-cols-4 gap-4">
                <WaterCard></WaterCard>
                <WaterCard></WaterCard>
                <WaterCard></WaterCard>
                <WaterCard></WaterCard>
            </div>
        </template>

    </commonCocaTabs>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import BeverageCard from './card/beverageCard.vue';
import CommonCocaTabs from './card/commonCocaTabs.vue';
import WaterCard from './card/waterCard.vue';

const cartTabValue = ref<"juice" | "water">("juice")

</script>
