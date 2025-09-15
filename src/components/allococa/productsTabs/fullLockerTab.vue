<template>
    <div class="flex items-center grow py-4">

        <section class="flex-1 flex justify-center items-center ">
            <div class="relative ">
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
            <!-- 83 -->
        </section>
        <section class="w-[452px] h-[calc(100vh-240px)] relative">
            <!-- configuration du casier -->
            <article class="absolute bottom-0 left-0 right-0  h-[calc(100vh-95px)] w-full">
                <ProductConfiguratorFullLocker :casier-products="casierProducts" @reset:casier="resetCasier"
                    @cart:add-casier="addCasierToCart" @set:full-quantity="setFullQuantity"
                    @update:casier-quantity="updateCasierQuantity">
                </productConfiguratorFullLocker>
            </article>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import ProductConfiguratorDialbox from './productConfiguratorDialbox.vue';
import type { CartLine, CasierProduct, Product } from '@/services/locker-products/locker-products-type';
import { productCapsuleData } from '@/services/locker-products/locker-products-constants';
import ProductConfiguratorFullLocker from './productConfiguratorFullLocker.vue';
import { useCart } from '@/composables/queries/useCart';

import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';


const route = useRoute();

const toast = useToast();

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
    if (!idCartLine || !type || type !== "full-locker") {
        return;
    }
    const findedCartLine = cart.value.find(cartLine => cartLine.id === idCartLine);
    casierProducts.value = {
        quantity: findedCartLine?.quantity ?? 1,
        products: findedCartLine?.products ?? []
    };
});


// const PRODUCTS_DATA: Product[] = [
//   { id: '1', name: 'Coca-Cola', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/coca.png', variant: '30cl' },
//   { id: '2', name: 'Coca-Cola Zéro', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/cocktail-fanta.png', variant: '30cl' },
//   { id: '3', name: 'Fanta Orange', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/fanta.png', variant: '30cl' },
//   { id: '4', name: 'Fanta Cocktail', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/cocktail-fanta.png', variant: '30cl' },
//   { id: '5', name: 'Fanta Fruits rouge', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/cocktail-fanta.png', variant: '30cl' },
//   { id: '6', name: 'Fanta Pommes', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/cocktail-fanta.png', variant: '30cl' },
// ];


const findProductDataCapsule = (productName: string) => {
    const test = productCapsuleData.find(product => product.name.toLowerCase() === productName.toLowerCase());

    console.log(test, productName.toLowerCase());

    const capsuleData = productCapsuleData.find(product => product.name === productName.toLowerCase());

    return new URL(capsuleData!.capsulePath, import.meta.url).href;
};

const addCasierToCart = () => {

    const cartLine: CartLine = {
        id: crypto.randomUUID(),
        type: "full-locker",
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









// const casierProducts = ref(7);

const setFullQuantity = (product: Product) => {

    casierProducts.value.products = Array(24).fill(product);
}


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


</script>

<style scoped></style>