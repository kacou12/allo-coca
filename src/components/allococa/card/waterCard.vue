<template>
    <div class="p-2 space-y-1 bg-[#F6F6F6] rounded-xl">
        <section class="h-[268px]">
            <img src="@/assets/allococa/products/coca.png" alt=""></img>
        </section>
        <section class="space-y-1">
            <p class="text-[10px]  text-[#888888]">Casier de 24 bouteilles</p>
            <p class="font-medium text-lg">Coca-Cola Classique</p>
            <div class="divide-x-1 divide-[#D1D1D1] space-x-1 mt-1">
                <p class="text-sm text-[#888888]">1.5L</p>
                <p class="text-sm">250 FCFA</p>
            </div>
            <div class="flex items-center justify-between">
                <CustomButton type="outline">
                    <ShoppingBasket></ShoppingBasket>
                    <span class="text-xs font-medium">Pack</span>
                </CustomButton>
                <CustomButton type="outline">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.16675 9.99105H15.8334M15.8334 9.99105L10.0001 4.15771M15.8334 9.99105L10.0001 15.8244"
                            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </CustomButton>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import { ArrowRight, ShoppingBasket } from 'lucide-vue-next';


</script>

<style scoped></style>