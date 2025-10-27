<template>
    <Sheet v-model:open="open">
        <SheetTrigger as-child>

            <section :class="[isScrolled ? 'bg-primary-50 border-primary-50' : 'border-white']"
                class="relative rounded-full border-[1px] p-2 border-white flex items-center justify-center cursor-pointer w-fit ">

                <article class="">

                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_13510_633)">
                            <path
                                d="M1.7085 1.70831H3.37516L5.59183 12.0583C5.67314 12.4374 5.88405 12.7762 6.18826 13.0165C6.49246 13.2568 6.87092 13.3836 7.2585 13.375H15.4085C15.7878 13.3744 16.1556 13.2444 16.451 13.0065C16.7465 12.7686 16.9519 12.4371 17.0335 12.0666L18.4085 5.87498H4.26683M7.50016 17.5C7.50016 17.9602 7.12707 18.3333 6.66683 18.3333C6.20659 18.3333 5.8335 17.9602 5.8335 17.5C5.8335 17.0397 6.20659 16.6666 6.66683 16.6666C7.12707 16.6666 7.50016 17.0397 7.50016 17.5ZM16.6668 17.5C16.6668 17.9602 16.2937 18.3333 15.8335 18.3333C15.3733 18.3333 15.0002 17.9602 15.0002 17.5C15.0002 17.0397 15.3733 16.6666 15.8335 16.6666C16.2937 16.6666 16.6668 17.0397 16.6668 17.5Z"
                                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_13510_633">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <span class="sr-only">Notifications</span>
                    <!-- <div
                           class="absolute text-[10px] inline-flex items-center justify-center w-6 h-6  font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                           20</div> -->
                    <div v-if="cartQuantityLength > 0"
                        class="absolute text-[10px] inline-flex items-center justify-center w-6 h-6  font-bold text-primary-50 bg-white border-[1px] border-primary-50 rounded-full -top-2 -end-2 dark:border-gray-900">
                        {{ cartQuantityLength }}</div>
                </article>

            </section>




        </SheetTrigger>
        <SheetContent class=" px-3  lg:w-[90%] sm:w-fit">
            <form @submit.prevent="onSubmit" class="mx-5">

                <section v-if="cartQuantityLength > 0">

                    <SheetHeader class="translate-y-[-10px]">
                        <SheetTitle>Mon panier</SheetTitle>

                    </SheetHeader>


                    <!-- content cart -->

                    <div class="flex flex-col justify-between h-[calc(100vh-60px)] ">
                        <section class="py-1 px-1 space-y-4 flex-1 overflow-y-scroll ">

                            <CartLineCard v-for="cartLine in cart" :key="cartLine.id" :cartLine="cartLine"
                                :type="cartLine.type" />

                        </section>


                        <!-- Résumé de ma commande -->
                        <div class="pb-12 md:pb-0">
                            <section class="py-4 space-y-4">
                                <div class="space-y-4">
                                    <h2 class="text-md font-bold">Résumé de ma commande</h2>
                                    <div class="flex justify-between items-center text-sm ">
                                        <span>Sous-total</span>
                                        <span class="font-semibold">{{ subtotal }} FCFA</span>
                                    </div>

                                    <div
                                        class="flex justify-between items-center text-sm  border-t pt-3  border-gray-300">
                                        <span>Consignation</span>
                                        <span class="font-semibold">{{ amountConsignation }} FCFA</span>
                                    </div>

                                    <article>
                                        <div class="flex items-center justify-between space-x-2 text-base">
                                            <section class="flex items-center gap-1">

                                                <input type="checkbox" id="consignation-checkbox"
                                                    v-model="has_own_lockers"
                                                    class="form-checkbox h-4 w-4 text-primary-50 rounded" />
                                                <label for="consignation-checkbox" class="text-gray-700 text-sm ">Je
                                                    possède
                                                    déjà
                                                    mes
                                                    casiers
                                                    (retirer la consigne)</label>
                                            </section>
                                            <section v-if="has_own_lockers">
                                                <InputNumberField id="locker-count" name="lockerCount" type="number"
                                                    v-model="count_has_own_lockers" :min="0" :max="casierQuantityLength"
                                                    class="p-2 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                                            </section>
                                        </div>
                                        <div class="min-h-[24px] " v-if="!!errors.lockerCount">
                                            <FadeInAnimation mode="out-in">

                                                <!-- <small v-if="errors.lockerCount"
                                                    class="app-form-item-error text-error-500 text-xs font-worksans font-normal ">
                                                    {{ errors.lockerCount }}
                                                </small> -->
                                                <small
                                                    class="app-form-item-error text-error-500 text-xs font-worksans font-normal ">
                                                    Veuillez sélectionner le nombre de casiers que vous souhaitez
                                                    consigner.
                                                </small>

                                            </FadeInAnimation>
                                        </div>
                                    </article>

                                    <div
                                        class="flex justify-between items-center text-sm  border-t pt-3  border-gray-300">
                                        <span>Livraison</span>
                                        <span class="font-semibold">0 FCFA</span>
                                    </div>

                                    <div
                                        class="flex justify-between items-center text-sm font-bold pt-3 border-t border-gray-300">
                                        <span>Total</span>
                                        <span class="text-primary-50">{{ total }} FCFA</span>
                                    </div>
                                </div>
                            </section>


                            <div class=" md:mt-1">
                                <Button type="submit" :disabled="!!errors.lockerCount"
                                    class="w-full py-5 text-sm rounded-[90px] bg-primary-50 hover:bg-primary-60 ">
                                    Finaliser ma commande
                                </Button>
                            </div>
                        </div>
                    </div>
                    <!-- content cart end -->

                    <SheetFooter>
                        <SheetClose as-child>
                            <!-- <Button type="submit">
                                Save changes
                            </Button> -->
                        </SheetClose>
                    </SheetFooter>
                </section>
                <section v-else class="h-screen flex justify-center items-center">

                    <div>
                        <img src="@/assets/allococa/empty-cart.gif" alt="">
                        <p class="text-sm text-[#888888]">Votre panier est vide</p>
                    </div>

                </section>
            </form>
        </SheetContent>
    </Sheet>
</template>
<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/composables/queries/useCart";

import { storeToRefs } from "pinia";
import CartLineCard from "./cartLineCard.vue";
import { computed, ref, watch } from "vue";
import type { CartLine, Product, ProductResponse } from "@/services/locker-products/locker-products-type";
import router from "@/router";
import { AppRoute } from "@/constants/app-route";
import { uniqBy } from 'lodash';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import Input from "@/components/ui/input/Input.vue";
import FadeInAnimation from "@/components/animations/fadeInAnimation.vue";
import InputNumberField from "@/components/vee-validate/InputNumberField.vue";


defineProps({
    isScrolled: {
        type: Boolean,
        default: false,
    },
})





const { cartQuantityLength, cart, casierQuantityLength, has_own_lockers, count_has_own_lockers, amountConsignation } = storeToRefs(useCart());

const hasErrorConsignation = computed(() => {
    return has_own_lockers.value && count_has_own_lockers.value < 1;
})

//     const amountConsignation = computed(() => {
//       if (has_own_lockers.value) {
//           return (casierQuantityLength.value - count_has_own_lockers.value) * 3600;
//       }
//       return casierQuantityLength.value * 3600;

//    });

const cartSchema = z.object({
    lockerCount: z.number()
        .min(1, 'min 1 locker')
        .optional()

}).refine(
    (data) => {
        if (has_own_lockers.value) {
            return data.lockerCount && data.lockerCount >= 1;
        }
        return true;
    },
    {
        message: 'Veuillez sélectionner le nombre de casiers que vous souhaitez consigner.',
        path: ['lockerCount']
    }
);

const open = ref(false);

const { handleSubmit, resetForm, errors } = useForm({
    validationSchema: toTypedSchema(cartSchema)
});


const onSubmit = handleSubmit(async () => {
    goToOrderPage();
});


watch(count_has_own_lockers, (newValue, oldValue) => {
    console.log('====================================');
    console.log(newValue);
    console.log('====================================');
})

const total = computed(() => {
    return subtotal.value + deliveryFee.value + amountConsignation.value;
})


const productsDataGrouped = (products: ProductResponse[], type: "locker" | "fullLocker" | "water") => {
    const groupedMap = new Map<string, ProductResponse>();

    const bottlesName = products.map(product => product.product.name);


    let setProducts = products;

    if (type === "locker") {
        setProducts = uniqBy(setProducts, 'id');
    }

    // const setProducts = new Set(products);

    setProducts.forEach(product => {
        const existing = groupedMap.get(product.id);

        if (existing) {
            existing.quantity += product.quantity;
        } else {
            groupedMap.set(product.id, { ...product });
        }
    });

    return Array.from(groupedMap.values());
};

const goToOrderPage = () => {

    router.push({
        name: AppRoute.DELIVERY_INITIALISATON.name
    }).then(() => {
        open.value = false;
    })
}




const deliveryFee = ref(0)

const subtotal = computed(() => {
    const test = cart.value.reduce((total, cartLine) => {
        const groupedProducts = productsDataGrouped(cartLine.products, cartLine.type);
        return total + groupedProducts.reduce((total, product) => {
            return total + product.unit_price * product.quantity
        }, 0);
    }, 0);

    return cart.value.reduce((total, cartLine) => {
        const groupedProducts = productsDataGrouped(cartLine.products, cartLine.type);
        return total + groupedProducts.reduce((total, product) => {
            return total + product.unit_price * product.quantity
        }, 0) * cartLine.quantity;
    }, 0);
})


// const { addCartLine, clearCart, removeCartLine } = useCart();
</script>