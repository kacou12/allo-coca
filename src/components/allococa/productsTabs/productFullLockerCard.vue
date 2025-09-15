<template>
    <div class="bg-white rounded-sm border p-1 relative h-[236px]">
        <!-- Contrôles de quantité en position absolue -->
        <!-- <div
        @click="fullIncrement" :disabled="casierProductsData.products.length === 24"
            class="absolute bottom-4 right-2 left-2 flex items-center justify-between bg-white rounded-full  px-2 py-1">
            

            <span class="text-lg font-semibold w-6 text-center text-gray-800">Approvisionner</span>

         
        </div> -->
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
        <h3 class=" font-bold text-sm text-center mb-4 ">{{ product.name }}</h3>

        <!-- Image du produit -->
        <div class="max-w-[186px]  ml-5">
            <img :src="product.image" :alt="`Image de ${product.name}`" class="" />
        </div>

        <!-- Informations prix et variante -->
        <div class="space-y-0 absolute  top-1/2 text-xs right-[10px]">
            <div class="flex justify-end">
                <p class=" text-gray-500 font-medium">{{ product.variant }}</p>
            </div>
            <div class="text-left">
                <p class=" font-bold text-gray-800">{{ product.price }} FCFA</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
// import Button from '@/components/ui/button/Button.vue';
import type { CasierProduct, Product } from '@/services/locker-products/locker-products-type';
import { Plus } from 'lucide-vue-next';
import { computed, ref, type PropType } from 'vue';

// Définition des props
// interface Props {
//     product: Product;
//     casierProducts: CasierProduct;
// }

const { product, casierProductsData } = defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true
    },
    casierProductsData: {
        type: Object as PropType<CasierProduct>,
        required: true
    }
});

const isDisabled = computed(() => casierProductsData.products.length === 24 && casierProductsData.products.length > 0 && casierProductsData.products[0].id == product.id);

// Déclaration de l'émetteur
const emit = defineEmits<{
    (e: 'fullIncrement', product: Product): void;
}>();


</script>

<style scoped>
/* Pas de styles spécifiques nécessaires, Tailwind s'occupe de tout */
</style>