<template>
    <div class="p-4 bg-white rounded-lg border border-[#E7E7E7] shadow-sm">
        <div class="flex items-center justify-between mb-2">
            <div class="text-sm font-bold"> {{ cartLine.type == 'water' ? 'Pack' : 'Casier' }}</div>
            <div class="text-sm font-semibold">{{ cartLineSubTotal * cartLine.quantity }} FCFA</div>
        </div>

        <div class=" text-gray-700 text-xs" v-if="cartLine.type == 'water'">
            <div>
                quantité: {{ cartLine.quantity }} pack(s)
            </div>
        </div>
        <div class=" text-gray-700 text-xs" v-else>
            <div>
                quantité: {{ cartLine.quantity }} casier(s)
            </div>
        </div>
        <div class="mb-4 text-gray-700 text-xs">
            <div v-for="product in productsDataGrouped" :key="product.id">
                <!-- {{ product.product.name }}: {{ product.quantity }} bouteille(s) -->
                {{ product.product.name }}: {{ product.quantity }} bouteille(s)
            </div>
        </div>

        <div class="flex space-x-2">
            <button @click="goUpdatePage"
                class=" px-4 h-[32px] text-xs font-bold text-black border border-black rounded-full hover:bg-gray-200 transition-colors duration-200">

                {{ cartLine.type == 'water' ? 'Modifier le pack' : 'Modifier le casier' }}
            </button>
            <button @click="removeCartLineAction"
                class="flex items-center justify-center w-[32px] h-[32px] bg-white border border-black hover:bg-gray-200 transition-colors duration-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCart } from '@/composables/queries/useCart';
import { AppRoute } from '@/constants/app-route';
import router from '@/router';
import type { CartLine, Product, ProductResponse } from '@/services/locker-products/locker-products-type';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { uniqBy } from 'lodash';
import { useToast } from 'vue-toastification';

const { cartLine, type } = defineProps<{
    cartLine: CartLine,
    type: "locker" | "fullLocker" | "water"
}>();

const toast = useToast();

const route = useRoute();

const { removeCartLine } = useCart();

const goUpdatePage = () => {
    if (type === "locker") {
        // window.location.href = `/locker/${cartLine.id}`;
        router.push({
            name: AppRoute.PRODUCTS.name, query: {
                type: "locker",
                id: cartLine.id,
            },
        }).then(() => {

            // setCartTabValue("casierCompose")
            router.go(0);
        });
    } else if (type === "fullLocker") {

        router.push({
            name: AppRoute.PRODUCTS.name, query: {
                type: "fullLocker",
                id: cartLine.id,
            },

        }).then(() => {
            // setCartTabValue("casierComplet")
            router.go(0);
        });;
    } else if (type === "water") {
        router.push({
            name: AppRoute.PRODUCTS.name, query: {
                type: "water",
                id: cartLine.id,
            },
        }).then(() => {
            // setCartTabValue("water")
            router.go(0);
        });;
    }


}




interface GroupedItem {
    id: string;
    name: string;
    totalQuantity: number;
}
const productsDataGrouped = computed(() => {
    const groupedMap = new Map<string, ProductResponse>();
    let setProducts = cartLine.products;
    if (type === "locker") {

        // setProducts = Array.from(new Set(cartLine.products));
        setProducts = uniqBy(cartLine.products, 'product_id');
    }


    setProducts.forEach(product => {
        const existing = groupedMap.get(product.id);

        if (existing) {
            existing.quantity += product.quantity;
        } else {
            groupedMap.set(product.id, { ...product });
        }
    });

    return Array.from(groupedMap.values());
})



const removeCartLineAction = () => {
    removeCartLine(cartLine);

    toast.success("Le casier a bien été supprimé du panier", { timeout: 3000 });
}

const cartLineSubTotal = computed(() => {

    return productsDataGrouped.value.reduce((total, product) => {
        return total + product.unit_price * product.quantity
    }, 0);
});


</script>