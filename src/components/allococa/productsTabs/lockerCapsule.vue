<template>
    <!-- capsule -->
    <img class="w-full h-full object-cover" :src="imgUrl" alt="">
</template>

<script setup lang="ts">
import type { Product } from '@/services/locker-products/locker-products-type';
import { computed, type PropType } from 'vue';
const { productImage } =
    defineProps({
        productImage: {
            type: String,
            required: true
        }
    })

const imgUrl = computed(() => new URL(`../../../assets/allococa/products/capsules/${productImage}`, import.meta.url).href);
</script>

<style scoped></style>