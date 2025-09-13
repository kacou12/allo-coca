<template>
    <div class="bg-white rounded-sm border p-1 relative h-[236px]">
        <!-- Contrôles de quantité en position absolue -->
        <div
            class="absolute bottom-4 right-2 left-2 flex items-center justify-between bg-white rounded-full  px-2 py-1">
            <button @click="decrement" :disabled="quantity === 0" :class="[
                'rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300',
                quantity === 0
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700'
            ]">
                <span class="text-lg font-light">-</span>
            </button>

            <span class="text-lg font-semibold w-6 text-center text-gray-800">{{ quantity }}</span>

            <button @click="increment"
                class="bg-red-600 text-white rounded-full  flex items-center justify-center transition-all duration-300 hover:bg-red-700">
                <div class=" w-6 h-6 rounded-full flex items-center justify-center">
                    <div class="">
                        <Plus :size="15"></Plus>
                    </div>
                </div>
            </button>
        </div>

        <!-- Nom du produit -->
        <h3 class=" font-bold  text-center mb-4 ">{{ product.name }}</h3>

        <!-- Image du produit -->
        <div class="flex justify-center ">
            <img :src="product.image" :alt="`Image de ${product.name}`" class="" />
        </div>

        <!-- Informations prix et variante -->
        <div class="space-y-0 absolute right-1 top-1/2 text-xs bg-orange-600">
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
import type { Product } from '@/services/locker-products/locker-products-type';
import { Plus } from 'lucide-vue-next';
import { ref } from 'vue';

// Définition des props
interface Props {
    product: Product;
}

const props = defineProps<Props>();

// Déclaration de l'émetteur
const emit = defineEmits<{
    (e: 'update:quantity', data: { id: string, newQuantity: number }): void;
}>();

// État local pour la quantité
const quantity = ref(props.product.quantity);

// Méthodes pour incrémenter et décrémenter
const increment = () => {
    quantity.value++;
    emit('update:quantity', {
        id: props.product.id,
        newQuantity: quantity.value
    });
};

const decrement = () => {
    if (quantity.value > 0) {
        quantity.value--;
        emit('update:quantity', {
            id: props.product.id,
            newQuantity: quantity.value
        });
    }
};
</script>

<style scoped>
/* Pas de styles spécifiques nécessaires, Tailwind s'occupe de tout */
</style>