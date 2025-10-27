<template>
    <div class="p-4 space-y-1 bg-[#F6F6F6] rounded-xl">
        <section class="h-[268px]  flex items-center justify-center">
            <img class="min-w-[69px] max-h-[220px]" :src="product.image_url" alt=""></img>
        </section>
        <section class="space-y-1">
            <p class="text-[13px]  text-[#888888]">{{ product.description }}</p>
            <p class="font-medium text-lg">{{ product.product.name }} {{ toLowercaseFirstLetterOfEachWord(product.label)
                }}</p>
            <div class="divide-x-[1px] divide-[#D1D1D1] space-x-[1px] mt-1 flex items-center gap-2">
                <p class="text-sm text-[#888888]">{{ product.size }}</p>
                <p class="text-sm pl-2">{{ formatPrice(product.unit_price) }}</p>
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
import type { Product, ProductResponse } from '@/services/locker-products/locker-products-type';
import { formatPrice, toLowercaseFirstLetterOfEachWord } from '@/shared/shared';
import { ArrowRight, Minus, Plus, ShoppingBasket } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { computed, ref, type PropType } from 'vue';
import { useToast } from 'vue-toastification';

// const imageUrl = computed(() => new URL(`../../../assets/allococa/products/water/${product.image}`, import.meta.url).href);
const toast = useToast();

const { waterProductDefaultQuantity, addCartLine, removeCartLine, clearCart } = useCart()

const { cart } = storeToRefs(useCart());
const { product } = defineProps({
    product: {
        type: Object as PropType<ProductResponse>,
        required: true
    },
});

const quantity = ref(waterProductDefaultQuantity(product.id));
const incrementWaterpPack = () => {
    quantity.value++;

    const existingCartLine = cart.value.find(item => item.id === product.id);

    addCartLine({
        id: product.id,
        type: "water",
        products: [{
            ...product,
            quantity: 1
        }],
        quantity: quantity.value,
    })

    if (!existingCartLine) {
        toast.success("Le pack a bien été ajouté au panier", { timeout: 3000 });
    }



};

const decrementWaterpPack = () => {
    if (quantity.value > 0) {
        quantity.value--;
        removeCartLine({
            id: product.id,
            type: "water",
            products: [{
                ...product,
                quantity: 1
            }],
            quantity: quantity.value,
        })
    }
};


</script>

<style scoped></style>