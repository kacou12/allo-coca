<template>
    <div class="p-4 space-y-1 bg-[#F6F6F6] rounded-xl">
        <section class="h-[268px]  flex items-center justify-center">
            <img class="w-[69px] h-[220px]" :src="imageUrl" alt=""></img>
        </section>
        <section class="space-y-1">
            <p class="text-[10px]  text-[#888888]">Pack de {{ product.quantity }}</p>
            <p class="font-medium text-lg">Céleste Naturelle 1.5L</p>
            <div class="divide-x-[1px] divide-[#D1D1D1] space-x-[1px] mt-1 flex items-center gap-2">
                <p class="text-sm text-[#888888]">{{ product.quantity }}</p>
                <p class="text-sm pl-2">{{ formatPrice(product.price) }}</p>
            </div>
            <!-- Contrôles de quantité en position absolue -->
            <section
                class="flex items-center justify-between rounded-full  px-2 py-1 border-[#E7E7E7] border-[1px] bg-[#E7E7E7]">
                <button @click="decrementWaterpPack" :disabled="quantity === 0" :class="[
                    'rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300',
                    quantity === 0
                        ? 'bg-[#D1D1D1] text-gray-300 cursor-not-allowed'
                        : ' border-[1px] bg-white border-[#3D3D3D] hover:bg-gray-200'
                ]">
                    <Minus class="text-[#888888]" :size="15"></Minus>
                </button>

                <span class="text-lg font-semibold w-6 text-center text-gray-800">{{
                    quantity }}</span>

                <button @click="incrementWaterpPack" class=" rounded-full  flex items-center justify-center transition-all duration-300
                    bg-red-600 hover:bg-red-700 text-white
                    ">
                    <div class=" w-6 h-6 rounded-full flex items-center justify-center">
                        <div class="">
                            <Plus :size="15"></Plus>
                        </div>
                    </div>
                </button>
            </section>
        </section>

    </div>
</template>

<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import Button from '@/components/ui/button/Button.vue';
import { useCart } from '@/composables/queries/useCart';
import type { Product } from '@/services/locker-products/locker-products-type';
import { formatPrice } from '@/shared/shared';
import { ArrowRight, Minus, Plus, ShoppingBasket } from 'lucide-vue-next';
import { computed, ref, type PropType } from 'vue';

const imageUrl = computed(() => new URL(`../../../assets/allococa/products/water/${product.image}`, import.meta.url).href);


const { cart, waterProductDefaultQuantity, addCartLine, removeCartLine, clearCart } = useCart()

const { product } = defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true
    },
});

const quantity = ref(waterProductDefaultQuantity(product.id));
const incrementWaterpPack = () => {
    quantity.value++;

    addCartLine({
        id: product.id,
        type: "water",
        products: [{ ...product, quantity: 1 }],
        quantity: quantity.value,
    })

};

const decrementWaterpPack = () => {
    if (quantity.value > 0) {
        quantity.value--;
        removeCartLine({
            id: product.id,
            type: "water",
            products: [{ ...product, quantity: 1 }],
            quantity: quantity.value,
        })
    }
};


</script>

<style scoped></style>