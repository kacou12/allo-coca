<template>
    <div class="flex items-center grow py-4">

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
                    <img class="w-full" src="@/assets/allococa/locker.png" alt="">
                </div>
                <ProductConfiguratorFullLocker :casier-products="casierProducts" @reset:casier="resetCasier"
                    :default-products="productsData!.items" @cart:edit-casier="editCasier"
                    @cart:add-casier="addCasierToCart" @set:full-quantity="setFullQuantity"
                    @update:casier-quantity="updateCasierQuantity">
                </productConfiguratorFullLocker>
            </article>
            <!-- 83 -->
        </section>
        <section class="hidden lg:block w-[452px] h-[calc(100vh-240px)] relative">
            <!-- configuration du casier -->
            <article v-if="isFetched" class="absolute bottom-0 left-0 right-0  h-[calc(100vh-95px)] w-full">
                <ProductConfiguratorFullLocker :casier-products="casierProducts" @reset:casier="resetCasier"
                    :default-products="productsData!.items" @cart:edit-casier="editCasier"
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
import type { CartLine, CasierProduct, Product, ProductResponse } from '@/services/locker-products/locker-products-type';
import { productCapsuleData } from '@/services/locker-products/locker-products-constants';
import ProductConfiguratorFullLocker from './productConfiguratorFullLocker.vue';
import { useCart } from '@/composables/queries/useCart';

import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import LockerCapsule from './lockerCapsule.vue';
import { useProductsByCategoryQuery } from '@/composables/queries/useProductsQueries';


const route = useRoute();

const router = useRouter();

const toast = useToast();

const { categoryId } = defineProps({
    categoryId: {
        type: String,
        required: true
    }
})

const { data: productsData, isFetched, isLoading } = useProductsByCategoryQuery(categoryId)


const { addCartLine, clearCart, removeCartLine, updateCartLine } = useCart();
const { cart } = storeToRefs(useCart());
const casierProducts = ref<CasierProduct>({
    quantity: 1,
    type: "fullLocker",
    products: [

    ]
});


onBeforeMount(() => {

    console.log('casierProducts', { ...route.query });
    const idCartLine = route.query.id;
    const type = route.query.type;
    if (!idCartLine || !type || type !== "fullLocker") {
        return;
    }
    const findedCartLine = cart.value.find(cartLine => cartLine.id === idCartLine);
    casierProducts.value = {
        type: type,
        quantity: findedCartLine?.quantity ?? 1,
        products: findedCartLine?.products ?? []
    };
});




const findProductDataCapsule = (productName: string) => {
    const test = productCapsuleData.find(product => product.name.toLowerCase() === productName.toLowerCase());

    console.log(test, productName.toLowerCase());

    const capsuleData = productCapsuleData.find(product => product.name === productName.toLowerCase());

    // return new URL(capsuleData!.capsulePath, import.meta.url).href;
    // return new URL(`../../../assets/allococa/products/${capsuleData!.capsulePath}`, import.meta.url).href;
    return capsuleData!.capsulePath;
};

const imageUrl = computed(() => findProductDataCapsule("fullLocker"));

const addCasierToCart = () => {

    const cartLine: CartLine = {
        id: crypto.randomUUID(),
        type: casierProducts.value.type,
        products: casierProducts.value.products,
        quantity: casierProducts.value.quantity,
    }

    addCartLine(cartLine);

    casierProducts.value = {
        type: "fullLocker",
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
        type: "fullLocker",
        quantity: 1,
        products: []
    };
    router.replace({

        query: {

        }
    })

    toast.success("Le casier a bien été modifié", { timeout: 3000 });
    // 
}









// const casierProducts = ref(7);

const setFullQuantity = (product: ProductResponse) => {

    casierProducts.value.products = Array(24).fill(product);
}


const resetCasier = () => {
    // casierProducts.value;
    console.log('====================================');
    console.log("resetCasier");
    console.log('====================================');
    casierProducts.value = {
        type: "fullLocker",
        quantity: 1,
        products: []
    };

};

const updateCasierQuantity = (value: number) => {
    casierProducts.value.quantity = value;

};


</script>

<style scoped></style>