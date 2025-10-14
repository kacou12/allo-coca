<template>
    <div class="bg-white rounded-sm border p-1 relative h-[236px]">
        <!-- Contrôles de quantité en position absolue -->
        <section
            class="absolute bottom-4 right-2 left-2 flex items-center justify-between rounded-full  px-2 py-1 border-[#E7E7E7] border-[1px] bg-[#F6F6F6]">
            <button @click="decrement" :disabled="product.quantity === 0" :class="[
                'rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300',
                product.quantity === 0
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'border-[1px] border-[#3D3D3D] hover:bg-gray-200'
                // : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700'
            ]">
                <Minus :size="15"></Minus>
            </button>

            <span class="text-sm md:text-lg font-semibold w-6 text-center text-gray-800">{{ product.quantity }}</span>

            <button @click="increment" :disabled="product.quantity == 24 || casierProductsData.products.length == 24"
                :class="[product.quantity == 24 || casierProductsData.products.length == 24 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white']"
                class=" rounded-full  flex items-center justify-center transition-all duration-300 ">
                <div class=" w-6 h-6 rounded-full flex items-center justify-center">
                    <div class="">
                        <Plus :size="15"></Plus>
                    </div>
                </div>
            </button>
        </section>

        <!-- Nom du produit -->
        <h3 class=" font-bold text-xs md:text-sm text-center mb-4 line-clamp-2">{{ product.product.name }} {{
            product.label
            }}</h3>

        <!-- Image du produit -->
        <div class=" ml-5">
            <img :src="product.image_url" :alt="`Image de ${product.product.name}`"
                class="object-cover w-[60px] max-h-[186px]" />
        </div>

        <!-- Informations prix et variante -->
        <div class="space-y-0 absolute right-[10px] top-1/2 text-xs ">
            <div class="flex justify-end">
                <p class=" text-gray-500 font-medium">{{ product.size }}</p>
            </div>
            <div class="text-left">
                <p class=" font-bold text-gray-800">{{ formatPrice(product.unit_price) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CasierProduct, Product, ProductResponse } from '@/services/locker-products/locker-products-type';
import { formatPrice } from '@/shared/shared';
import { Minus, Plus } from 'lucide-vue-next';
import { computed, ref, type PropType } from 'vue';

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


// Déclaration de l'émetteur
const emit = defineEmits<{
    (e: 'update:quantity', data: { id: string, newQuantity: number }): void;
}>();

// Méthodes pour incrémenter et décrémenter
const increment = () => {
    // quantity.value++;
    emit('update:quantity', {
        id: product.id,
        newQuantity: product.quantity + 1
    });
};

const decrement = () => {
    if (product.quantity > 0) {
        // quantity.value--;
        emit('update:quantity', {
            id: product.id,
            newQuantity: product.quantity - 1
        });
    }
};
</script>

<style scoped>
/* Pas de styles spécifiques nécessaires, Tailwind s'occupe de tout */
</style>