<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 flex-1 ">
        <MineralWaterCard :product="product" :key="product.id" v-for="product in products"></mineralWaterCard>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MineralWaterCard from './mineralWaterCard.vue';


const products = ref([
    {
        "id": "1",
        "name": "Céleste Naturelle",
        "description": "Pack de 6",
        "price": 1800,
        "quantity": 0,
        "image": "url_to_image_01.png",
        "variant": "1.5L"
    },
    {
        "id": "2",
        "name": "Céleste Naturelle",
        "description": "Pack de 9",
        "price": 2475,
        "quantity": 0,
        "image": "url_to_image_02.png",
        "variant": "1.5L"
    },
    {
        "id": "3",
        "name": "Céleste Naturelle",
        "description": "Pack de 12",
        "price": 2100,
        "quantity": 0,
        "image": "url_to_image_03.png",
        "variant": "1L"
    },
    {
        "id": "4",
        "name": "Céleste Naturelle",
        "description": "Pack de 9",
        "price": 990,
        "quantity": 0,
        "image": "url_to_image_04.png",
        "variant": "0.5L"
    },
    {
        "id": "5",
        "name": "Céleste Naturelle",
        "description": "Pack de 15",
        "price": 1350,
        "quantity": 0,
        "image": "url_to_image_05.png",
        "variant": "0.33L"
    },
    {
        "id": "6",
        "name": "Céleste",
        "description": "Bidonbonne",
        "price": 2100,
        "quantity": 0,
        "image": "url_to_image_06.png",
        "variant": "17L"
    },
    {
        "id": "7",
        "name": "Cristalline",
        "description": "Pack de 6",
        "price": 1500,
        "quantity": 0,
        "image": "url_to_image_07.png",
        "variant": "1.5L"
    },
    {
        "id": "8",
        "name": "Cristalline",
        "description": "Pack de 12",
        "price": 1080,
        "quantity": 0,
        "image": "url_to_image_08.png",
        "variant": "0.5L"
    },
    {
        "id": "9",
        "name": "Cristalline",
        "description": "Pack de 16",
        "price": 1200,
        "quantity": 0,
        "image": "url_to_image_09.png",
        "variant": "0.33L"
    },
    {
        "id": "10",
        "name": "Awa",
        "description": "Pack de 6",
        "price": 1800,
        "quantity": 0,
        "image": "url_to_image_10.png",
        "variant": "1.5L"
    },
    {
        "id": "11",
        "name": "Awa",
        "description": "Pack de 9",
        "price": 900,
        "quantity": 0,
        "image": "url_to_image_11.png",
        "variant": "0.5L"
    }
]);

</script>

<style scoped></style>