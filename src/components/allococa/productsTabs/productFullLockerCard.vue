<template>
    <div class="bg-white rounded-sm border p-1 relative h-[236px]">

        <div class="absolute bottom-4 right-2 left-2 flex items-center justify-between">

            <!-- <CommonButton class="h-[35px]" title="Approvisionner"
                @click="emit('fullIncrement', { ...product, quantity: 1 })"
                :disabled="casierProductsData.products.length === 24 && casierProductsData.products.length > 0 && casierProductsData.products[0].id == product.id">

            </CommonButton> -->

            <button :disabled="isDisabled" @click="emit('fullIncrement', { ...product, quantity: 1 })"
                :class="[isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-50 hover:bg-primary-40 text-white']"
                class="w-full py-1 text-sm rounded-[90px] transition-colors duration-200 ">
                Approvisionner
            </button>
        </div>

        <!-- Nom du produit -->
        <h3 class=" font-bold text-sm text-center mb-4 ">{{ product.product.name }}</h3>

        <!-- Image du produit -->
        <div class="w-[60px] h-[186px] ml-5">
            <img :src="product.image_url" :alt="`Image de ${product.product.name}`"
                class="object-cover h-full w-full" />
        </div>

        <!-- Informations prix et variante -->
        <div class="space-y-0 absolute  top-1/2 text-xs right-[10px]">
            <div class="flex justify-end">
                <p class=" text-gray-500 font-medium">{{ product.label }}</p>
            </div>
            <div class="text-left">
                <p class=" font-bold text-gray-800">{{ formatPrice(product.unit_price) }} </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import Button from '@/components/ui/button/Button.vue';
import type { CasierProduct, ProductResponse } from '@/services/locker-products/locker-products-type';
import { formatPrice } from '@/shared/shared';
import { computed, type PropType } from 'vue';

// Définition des props
// interface Props {
//     product: Product;
//     casierProducts: CasierProduct;
// }

const { product, casierProductsData } = defineProps({
    product: {
        type: Object as PropType<ProductResponse>,
        required: true
    },
    casierProductsData: {
        type: Object as PropType<CasierProduct>,
        required: true
    }
});

// const imageUrl = computed(() => new URL(`../../../assets/allococa/products/${product.image}`, import.meta.url).href);

const isDisabled = computed(() => casierProductsData.products.length === 24 && casierProductsData.products.length > 0 && casierProductsData.products[0].id == product.id);

// Déclaration de l'émetteur
const emit = defineEmits<{
    (e: 'fullIncrement', product: ProductResponse): void;
}>();


</script>

<style scoped>
/* Pas de styles spécifiques nécessaires, Tailwind s'occupe de tout */
</style>