<template>
    <div class="p-4 space-y-1 bg-[#F6F6F6] rounded-xl">
        <section class="h-[268px]  flex items-center justify-center ">
            <img src="@/assets/allococa/products/coca.png" alt=""></img>
        </section>
        <section class="space-y-1">
            <p class="text-[10px]  text-[#888888]">Casier de 24 bouteilles</p>
            <p class="font-medium text-lg">Coca-Cola Classique</p>
            <div class="divide-x-[1px] divide-[#D1D1D1] space-x-2 mt-1 flex items-center gap-2">
                <p class="text-sm text-[#888888]">30cl</p>
                <p class="text-sm pl-2">250 FCFA</p>
            </div>
            <div class="flex items-center justify-between">
                <Button class="rounded-[90px] h-8 border-black" variant="outline">
                    <div class="flex items-center gap-1">
                        <ShoppingBasket></ShoppingBasket>
                        <span class="text-xs font-medium">Casier</span>
                    </div>
                </Button>

                <Button class=" border-black" variant="ghost">
                    <div class="border-black border-[1px] bg-white p-2 rounded-full">

                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16675 9.99105H15.8334M15.8334 9.99105L10.0001 4.15771M15.8334 9.99105L10.0001 15.8244"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </Button>

            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import Button from '@/components/ui/button/Button.vue';
import { ArrowRight, ShoppingBasket } from 'lucide-vue-next';


</script>

<style scoped></style>