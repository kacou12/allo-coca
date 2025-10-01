<template>
    <section v-if="isFetched">

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 flex-1 ">
            <MineralWaterCard :product="product" :key="product.id" v-for="product in productsData?.items">
            </mineralWaterCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MineralWaterCard from './mineralWaterCard.vue';
import { useProductsByCategoryQuery } from '@/composables/queries/useProductsQueries';
const { categoryId } = defineProps({
    categoryId: {
        type: String,
        required: true
    }
})

const { data: productsData, isFetched, isLoading } = useProductsByCategoryQuery(categoryId)


// const products = ref([
//     {
//         "id": "1",
//         "name": "Céleste Naturelle 1.5L", // Nom mis à jour pour plus de clarté
//         "description": "Pack de 6",
//         "price": 1800,
//         "quantity": 6, // Corrigé pour correspondre à l'image
//         "image": "celeste.png",
//         "variant": "1.5L",
//         "isNew": true, // Ajout de la propriété "Nouveauté"
//     },
//     {
//         "id": "2",
//         "name": "Céleste Naturelle 1.5L",
//         "description": "Pack de 9",
//         "price": 2475,
//         "quantity": 9, // Corrigé pour correspondre à l'image
//         "image": "celeste.png",
//         "variant": "1.5L",
//     },
//     {
//         "id": "3",
//         "name": "Céleste Naturelle 1L",
//         "description": "Pack de 12",
//         "price": 2100,
//         "quantity": 12, // Correct
//         "image": "celeste-pack-12-1l.png",
//         "variant": "1L",
//     },
//     {
//         "id": "4",
//         "name": "Céleste Naturelle 0.5L",
//         "description": "Pack de 9",
//         "price": 990,
//         "quantity": 9, // Corrigé pour correspondre à l'image
//         "image": "celeste-naturel-pack-9-05l.png",
//         "variant": "0.5L",
//     },
//     {
//         "id": "5",
//         "name": "Céleste Naturelle 0.33L",
//         "description": "Pack de 15",
//         "price": 1350,
//         "quantity": 15, // Corrigé pour correspondre à l'image
//         "image": "celeste-naturel-pack-15-033l.png",
//         "variant": "0.33L",
//     },
//     {
//         "id": "6",
//         "name": "Céleste 17L",
//         "description": "Bonbonne",
//         "price": 2100,
//         "quantity": 1, // Corrigé pour correspondre à l'image
//         "image": "celeste-pack-bonbonne-17l.png",
//         "variant": "17L",
//         "isNew": true, // Ajout de la propriété "Nouveauté"
//     },
//     {
//         "id": "7",
//         "name": "Cristalline 1.5L",
//         "description": "Pack de 6",
//         "price": 1500,
//         "quantity": 6, // Corrigé pour correspondre à l'image
//         "image": "cristaline-pack-6-15l.png",
//         "variant": "1.5L",
//     },
//     {
//         "id": "8",
//         "name": "Cristalline 0.5L",
//         "description": "Pack de 12",
//         "price": 1080,
//         "quantity": 12, // Corrigé pour correspondre à l'image
//         "image": "cristaline-pack-12-05l.png",
//         "variant": "0.5L",
//     },
//     {
//         "id": "9",
//         "name": "Cristalline 0.33L",
//         "description": "Pack de 16",
//         "price": 1200,
//         "quantity": 16, // Correct
//         "image": "cristaline-pack-16-033l.png",
//         "variant": "0.33L",
//     },
//     {
//         "id": "10",
//         "name": "Awa 1.5L",
//         "description": "Pack de 6",
//         "price": 1800,
//         "quantity": 6, // Corrigé pour correspondre à l'image
//         "image": "awa-pack-6-15l.png",
//         "variant": "1.5L",
//     },
//     {
//         "id": "11",
//         "name": "Awa 0.5L",
//         "description": "Pack de 9",
//         "price": 900,
//         "quantity": 9, // Corrigé pour correspondre à l'image
//         "image": "awa-pack-9-05l.png",
//         "variant": "0.5L",
//     }
// ]);
</script>

<style scoped></style>