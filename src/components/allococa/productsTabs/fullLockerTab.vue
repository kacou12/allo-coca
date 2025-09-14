<template>
    <div class="flex items-center grow bg-purple-500 p-4">

        <section class="flex-1 flex justify-center items-center ">
            <div class="relative bg-emerald-900">
                <!-- <div class="absolute top-[32px] left-[25px]   grid grid-cols-6 gap-2"> -->
                <div class="absolute top-[7%] left-[6%] lg:left-[4.7%]   grid grid-cols-6 gap-2">
                    <!-- capsule -->
                    <section v-for="product in casierProducts.products"
                        class=" border-2 col-span-1 max-h-[40px] lg:max-h-[80px]">
                        <img class="w-full h-full object-cover" :src="findProductDataCapsule(product.name)" alt="">
                    </section>
                    <!-- src="@/assets/allococa/products/capsules/coca-capsule.png" alt=""> -->
                </div>
                <img src="@/assets/allococa/locker.png" alt="">
            </div>
            <!-- 83 -->
        </section>
        <section class="w-[452px] h-[calc(100vh-180px)] bg-green-400 relative">
            <!-- configuration du casier -->
            <article class="absolute bottom-0 left-0 right-0 bg-yellow-900 h-[calc(100vh-95px)] w-full">
                <ProductConfiguratorFullLocker :casier-products="casierProducts" @reset:casier="resetCasier"
                    @set:full-quantity="setFullQuantity" @update:casier-quantity="updateCasierQuantity">
                </productConfiguratorFullLocker>
            </article>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ProductConfiguratorDialbox from './productConfiguratorDialbox.vue';
import type { CasierProduct, Product } from '@/services/locker-products/locker-products-type';
import { productCapsuleData } from '@/services/locker-products/locker-products-constants';
import ProductConfiguratorFullLocker from './productConfiguratorFullLocker.vue';

const casierProducts = ref<CasierProduct>({
    quantity: 1,
    products: [

    ]
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