<template>
    <div class="rounded-xl overflow-hidden bg-white shadow-lg">
        <section class="h-[300px]">
            <img class="w-full h-full object-cover"
                src="@/assets/allococa/home/type-commande-section/complet-casier.jpg"
                alt="Image de bouteilles de soda" />
        </section>

        <article class="p-4 bg-red-600 text-white text-start">
            <h2 class="text-xl font-tcc font-bold mb-2">Casiers complets</h2>
            <p class="text-sm mb-4">
                Choisis directement un casier pré-rempli (24 bouteilles) : Coca-Cola, Fanta, Sprite…
            </p>

            <!-- <div class="flex items-center gap-1">
                <a href="#" class="text-white text-sm font-medium hover:underline">
                    Voir les casiers
                </a>
                <ArrowRight class="h-4 w-4" />
            </div> -->
            <TextLinkWithArrow color="text-white" text="Voir les casiers"></TextLinkWithArrow>
        </article>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import TextLinkWithArrow from '../textLinkWithArrow.vue';
</script>

<style scoped>
/* No specific styles needed, Tailwind CSS handles it */
</style>