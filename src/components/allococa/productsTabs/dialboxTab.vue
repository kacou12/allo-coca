<template>
    <div class="flex items-center grow  py-4">

        <section class=" flex-1 flex flex-col lg:flex-row justify-center items-center">
            <div class="relative hidden lg:block">
                <!-- <div class="absolute top-[32px] left-[25px]   grid grid-cols-6 gap-2"> -->
                <div class="absolute top-[7%] lg:left-[4.7%]  right-[5%]  grid grid-cols-6 gap-2">
                    <!-- capsule -->
                    <section v-for="product in casierProducts.products"
                        class=" col-span-1 max-h-[40px] lg:max-h-[80px]">
                        <!-- <LockerCapsule :product-image="findProductDataCapsule(product.name)"></LockerCapsule> -->
                        <LockerCapsule :product-image="product.icon_url"></LockerCapsule>
                    </section>
                    <!-- <img class="w-full h-full object-cover" :src="findProductDataCapsule(product.name)" alt=""> -->
                    <!-- src="@/assets/allococa/products/capsules/coca-capsule.png" alt=""> -->
                </div>
                <img src="@/assets/allococa/locker.png" alt="">
            </div>

            <!-- configuration du casier -->
            <article v-if="isFetched" class="block lg:hidden w-full ">
                <div class="relative  w-full md:w-1/2 md:mx-auto">
                    <!-- <div class="absolute top-[32px] left-[25px]   grid grid-cols-6 gap-2"> -->
                    <div class="absolute top-[7%] bottom-[18%] right-[5%] left-[4.7%]   grid grid-cols-6 gap-2 ">
                        <!-- capsule -->
                        <section v-for="product in casierProducts.products"
                            class=" col-span-1 max-h-[40px] lg:max-h-[80px]">
                            <!-- <LockerCapsule :product-image="findProductDataCapsule(product.name)"></LockerCapsule> -->
                            <LockerCapsule :product-image="product.icon_url"></LockerCapsule>
                        </section>
                        <!-- <img class="w-full h-full object-cover" :src="findProductDataCapsule(product.name)" alt=""> -->
                        <!-- src="@/assets/allococa/products/capsules/coca-capsule.png" alt=""> -->
                    </div>
                    <img class="w-full " src="@/assets/allococa/locker.png" alt="">
                </div>
                <ProductConfiguratorDialbox :default-products="productsData!.items" :casier-products="casierProducts"
                    @increase:quantity="increaseQuantity" @cart:edit-casier="editCasier"
                    @decrease:quantity="decreaseQuantity" @reset:casier="resetCasier" @cart:add-casier="addCasierToCart"
                    @update:casier-quantity="updateCasierQuantity">
                </ProductConfiguratorDialbox>
            </article>
            <!-- 83 -->
        </section>
        <section class="hidden lg:block w-[452px] h-[calc(100vh-240px)] relative">
            <!-- configuration du casier -->
            <article v-if="isFetched" class="absolute bottom-0 left-0 right-0  h-[calc(100vh-95px)] w-full">
                <ProductConfiguratorDialbox :default-products="productsData!.items" :casier-products="casierProducts"
                    @increase:quantity="increaseQuantity" @cart:edit-casier="editCasier"
                    @decrease:quantity="decreaseQuantity" @reset:casier="resetCasier" @cart:add-casier="addCasierToCart"
                    @update:casier-quantity="updateCasierQuantity">
                </ProductConfiguratorDialbox>
            </article>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useCart } from '@/composables/queries/useCart';
import { productCapsuleData } from '@/services/locker-products/locker-products-constants';
import type { CartLine, CasierProduct, ProductResponse } from '@/services/locker-products/locker-products-type';
import { onBeforeMount, ref } from 'vue';
import ProductConfiguratorDialbox from './productConfiguratorDialbox.vue';

import { useProductsByCategoryQuery } from '@/composables/queries/useProductsQueries';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import LockerCapsule from './lockerCapsule.vue';

const { categoryId } = defineProps({
    categoryId: {
        type: String,
        required: true
    }
})

const { data: productsData, isFetched, isLoading } = useProductsByCategoryQuery(categoryId)


const toast = useToast();

const route = useRoute();

const { addCartLine, clearCart, removeCartLine, updateCartLine } = useCart();
const { cart } = storeToRefs(useCart());

const casierProducts = ref<CasierProduct>({
    type: "locker",
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
        type: "locker",
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

    // return new URL(capsuleData!.capsulePath, import.meta.url).href;
    // return new URL(`../../../assets/allococa/products/${capsuleData!.capsulePath}`, import.meta.url).href;
    return capsuleData!.capsulePath;
};







// const casierProducts = ref(7);

const increaseQuantity = (product: ProductResponse) => {

    casierProducts.value.products = [...casierProducts.value.products, ...Array(1).fill(product)];
};

const decreaseQuantity = (product: ProductResponse) => {

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
        type: "locker",
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
        type: "locker",
        quantity: 1,
        products: []
    };

    toast.success("Le casier a bien été ajouté au panier", { timeout: 3000 });
    // 
}

const editCasier = () => {
    const idCartLine = route.query.id;
    const type = route.query.type;
    if (!idCartLine || !type || type !== "fullLocker") {
        toast.error("Quelque chose s'est mal passe");

        return;
    }
    // const existingCartLine = cart.value.find(item => item.id === idCartLine);


    const cartLine: CartLine = {
        id: idCartLine as string,
        type: "fullLocker",
        products: casierProducts.value.products,
        quantity: casierProducts.value.quantity,
    }

    updateCartLine(cartLine);

    casierProducts.value = {
        type: "locker",
        quantity: 1,
        products: []
    };

    toast.success("Le casier a bien été modifié", { timeout: 3000 });
    // 
}

</script>

<style scoped></style>