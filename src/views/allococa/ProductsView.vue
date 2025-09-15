<template>

    <div class="py-10 spac-y-5 pt-[80px]   maxContain3xl">
        <section class="flex items-center gap-1">
            <p class="text-[#6D6D6D]">Livraison:</p>
            <p class="text-primary">En 24H et gratuite </p>
            <p class="text-[#6D6D6D]">. Sur-mesure:</p>
            <p class="text-primary">100%</p>
        </section>

        <section>
            <CommonCocaTabs :tabs="[
                { value: 'casierCompose', label: 'Casiers à composer' },
                { value: 'casierComplet', label: 'Casiers complets' },
                { value: 'water', label: 'Eau Minérale' },
            ]">
                <template #casierCompose>
                    <DialboxTab></DialboxTab>
                </template>
                <template #casierComplet>
                    <FullLockerTab></FullLockerTab>
                </template>
                <template #water>
                    <MineralWaterTab></MineralWaterTab>
                </template>

            </commonCocaTabs>
        </section>
    </div>
</template>

<script setup lang="ts">
import CommonCocaTabs from '@/components/allococa/card/commonCocaTabs.vue';
import DialboxTab from '@/components/allococa/productsTabs/dialboxTab.vue';
import FullLockerTab from '@/components/allococa/productsTabs/fullLockerTab.vue';
import MineralWaterTab from '@/components/allococa/productsTabs/mineralWaterTab.vue';


</script>

<style scoped></style>