<template>
    <div class="rounded-xl">
        <section class="h-[300px]">
            <img class="w-full h-full object-cover"
                src="/src/assets/allococa/home/type-commande-section/complet-casier.jpg" alt="">
        </section>
        <article class="flex flex-col justify-between">
            <section class="p-2">
                <p class="font-tcc font-bold clamp-sm">Casiers complets</p>
                <p class="text-sm line-clamp-2">Choisis directement un casier pré-rempli (24 bouteilles) : Coca-Cola,
                    Fanta, Sprite… 
                </p>
            </section>

            <!-- <div class="flex items-center gap-1">
                <Button variant="link">Voir les casiers</Button>
                <ArrowRight></ArrowRight>
            </div> -->
            <TextLinkWithArrow text="Voir les casiers"></TextLinkWithArrow>
        </article>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import TextLinkWithArrow from '../textLinkWithArrow.vue';


</script>

<style scoped></style>