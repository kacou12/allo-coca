<template>
    <div class="flex items-center grow  py-4">

        <section class="flex-1 flex justify-center items-center ">
            <div class="relative hidden lg:block ">
                <!-- <div class="absolute top-[32px] left-[25px]   grid grid-cols-6 gap-2"> -->
                <div class="absolute top-[7%] left-[6%] lg:left-[4.7%]   grid grid-cols-6 gap-2">
                    <!-- capsule -->
                    <section v-for="product in casierProducts.products"
                        class=" col-span-1 max-h-[40px] lg:max-h-[80px]">
                        <img class="w-full h-full object-cover" :src="findProductDataCapsule(product.name)" alt="">
                    </section>
                    <!-- src="@/assets/allococa/products/capsules/coca-capsule.png" alt=""> -->
                </div>
                <img src="@/assets/allococa/locker.png" alt="">
            </div>

            <!-- configuration du casier -->
            <article class="block lg:hidden w-full">
                <ProductConfiguratorDialbox :casier-products="casierProducts" @increase:quantity="increaseQuantity"
                    @decrease:quantity="decreaseQuantity" @reset:casier="resetCasier" @cart:add-casier="addCasierToCart"
                    @update:casier-quantity="updateCasierQuantity">
                </ProductConfiguratorDialbox>
            </article>
            <!-- 83 -->
        </section>
        <section class="hidden lg:block w-[452px] h-[calc(100vh-240px)]  relative ">
            <!-- configuration du casier -->
            <article class="absolute bottom-0 left-0 right-0  h-[calc(100vh-100px)] w-full ">
                <ProductConfiguratorDialbox :casier-products="casierProducts" @increase:quantity="increaseQuantity"
                    @decrease:quantity="decreaseQuantity" @reset:casier="resetCasier" @cart:add-casier="addCasierToCart"
                    @update:casier-quantity="updateCasierQuantity">
                </ProductConfiguratorDialbox>
            </article>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import ProductConfiguratorDialbox from './productConfiguratorDialbox.vue';
import type { CartLine, CasierProduct, Product } from '@/services/locker-products/locker-products-type';
import { productCapsuleData } from '@/services/locker-products/locker-products-constants';
import { useCart } from '@/composables/queries/useCart';

import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

const toast = useToast();

const route = useRoute();

const { addCartLine, clearCart, removeCartLine } = useCart();
const { cart } = storeToRefs(useCart());

const casierProducts = ref<CasierProduct>({
    quantity: 1,
    products: [

    ]
});

onBeforeMount(() => {

    console.log('casierProducts', { ...route.query });
    const idCartLine = route.query.id;
    const type = route.query.type;
    if (!idCartLine || !type || type !== "locker") {
        return;
    }
    const findedCartLine = cart.value.find(cartLine => cartLine.id === idCartLine);
    casierProducts.value = {
        quantity: findedCartLine?.quantity ?? 1,
        products: findedCartLine?.products ?? []
    };
});

// watch(route, (n, o) => {
//     console.log('casierProducts', { ...route.query });
//     const idCartLine = route.query.id;
//     const type = route.query.type;
//     if (!idCartLine || !type) {
//         return;
//     }
//     const findedCartLine = cart.value.find(cartLine => cartLine.id === idCartLine);
//     casierProducts.value = {
//         quantity: findedCartLine?.quantity ?? 1,
//         products: findedCartLine?.products ?? []
//     };

// })


const findProductDataCapsule = (productName: string) => {
    const test = productCapsuleData.find(product => product.name.toLowerCase() === productName.toLowerCase());

    console.log(test, productName.toLowerCase());

    const capsuleData = productCapsuleData.find(product => product.name === productName.toLowerCase());

    return new URL(capsuleData!.capsulePath, import.meta.url).href;
};









// const casierProducts = ref(7);

const increaseQuantity = (product: Product) => {
    casierProducts.value.products = [...casierProducts.value.products, product]

};

const decreaseQuantity = (product: Product) => {

    const reversedIndex = [...casierProducts.value.products].reverse().findIndex(obj => obj.id === product.id);

    if (reversedIndex !== -1) {
        const originalIndex = casierProducts.value.products.length - 1 - reversedIndex;
        casierProducts.value.products.splice(originalIndex, 1);
    }

};

const resetCasier = () => {
    // casierProducts.value;
    console.log('====================================');
    console.log("resetCasier");
    console.log('====================================');
    casierProducts.value = {
        quantity: 1,
        products: []
    };

};

const updateCasierQuantity = (value: number) => {
    casierProducts.value.quantity = value;

};

const addCasierToCart = () => {

    const cartLine: CartLine = {
        id: crypto.randomUUID(),
        type: "locker",
        products: casierProducts.value.products,
        quantity: casierProducts.value.quantity,
    }

    addCartLine(cartLine);

    casierProducts.value = {
        quantity: 1,
        products: []
    };

    toast.success("Le casier a bien été ajouté au panier", { timeout: 3000 });
    // 
}


</script>

<style scoped></style>