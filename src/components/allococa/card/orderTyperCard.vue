<template>
    <div class="rounded-xl overflow-hidden bg-red-600 shadow-lg">
        <section class="h-[300px]">
            <img class="w-full h-full object-cover" :src="imageUrl" />
        </section>

        <article class="p-4 bg-red-600 text-white text-start ">
            <div class="h-20">

                <h2 class="text-xl font-tcc font-bold mb-2">{{ cardData.title }}</h2>
                <p class="text-sm mb-4 line-clamp-2">{{ cardData.description }}</p>
            </div>

            <TextLinkWithArrow color="text-white" text="Voir les casiers"></TextLinkWithArrow>
        </article>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import TextLinkWithArrow from '../textLinkWithArrow.vue';


export interface CardData {
    image: string;
    title: string;
    description: string;

}


const props = defineProps<{
    cardData: CardData;
}>();

const imageUrl = computed(() => new URL(`../../../assets/allococa/home/type-commande-section/${props.cardData.image}`, import.meta.url).href);
// const imageUrl = computed(() => new URL(props.cardData.image, import.meta.url).href);


</script>

<style scoped>
/* No specific styles needed, Tailwind CSS handles it */
</style>