<template>
    <form @submit.prevent="onSubmit" class="mx-5">
        <div class="  flex flex-col md:flex-row gap-10 ">
            <section class="flex-1 order-2 md:order-1">
                <div>
                    <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="email">
                        Prénom & Nom
                    </label>
                    <InputField name="fullName" v-model="deliveryState.fullName" type="text" id="fullName"
                        placeholder="Prénom & Nom" class="py-2 pr-12">
                    </InputField>
                </div>

                <div>
                    <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="email">
                        Numéro de téléphones
                    </label>
                    <InputField name="phone" v-model="deliveryState.phone" type="text" id="fullName"
                        placeholder="Numéro de téléphone" class="py-2 pr-12">
                    </InputField>
                </div>


                <div>
                    <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="commune">
                        Commune
                    </label>
                    <SelectField name="common" v-model="deliveryState.common" border-color="border-neutral-60"
                        default-width="w-full" title="Commune" :elements="[
                            {
                                name: 'Abobo',
                                value: 'abobo'
                            },
                            {
                                name: 'Adjamé',
                                value: 'adjame'
                            },
                            {
                                name: 'Anyama',
                                value: 'anyama'
                            },
                            {
                                name: 'Attécoubé',
                                value: 'attecoube'
                            },
                            {
                                name: 'Bingerville',
                                value: 'bingerville'
                            },
                            {
                                name: 'Cocody',
                                value: 'cocody'
                            },
                            {
                                name: 'Koumassi',
                                value: 'koumassi'
                            },
                            {
                                name: 'Marcory',
                                value: 'marcory'
                            },
                            {
                                name: 'Plateau',
                                value: 'plateau'
                            },
                            {
                                name: 'Port-Bouët',
                                value: 'port-bouet'
                            },
                            {
                                name: 'Treichville',
                                value: 'treichville'
                            },
                            {
                                name: 'Yopougon',
                                value: 'yopougon'
                            }
                        ]">
                    </SelectField>
                </div>

                <div>
                    <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="deliveryAdress">
                        Adresse de livraison
                    </label>
                    <InputField name="deliveryAdress" v-model="deliveryState.deliveryAdress" type="text" id="fullName"
                        placeholder="Ex: Cocody angré" class="py-2 pr-12" required>
                    </InputField>
                </div>

                <div>
                    <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="instructions">
                        Instructions de livraison (optionnel)
                    </label>
                    <TextareaField name="instructions" v-model="deliveryState.instructions" type="text"
                        id="instructions" placeholder="" class="py-2 pr-12" required>
                    </TextareaField>
                </div>
            </section>
            <section class="flex-1 rounded-lg order-1 md:order-2">
                <div class="bg-[#F6F6F6] rounded-lg p-4  flex flex-col justify-between">
                    <!-- En-tête avec titre et date -->
                    <div class="flex items-center justify-between mb-4 ml-5">
                        <h3 class="text-lg font-semibold text-gray-800">
                            <!-- {{ order.title }} -->
                            Résumé de la commande
                        </h3>
                    </div>
                    <!-- Items de la commande -->
                    <div class="space-y-2 mb-4 ml-5">
                        <!-- Casier -->
                        <div v-if="order.casier" class="flex items-start space-x-2">
                            <!-- <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div> -->
                            <div class="flex items-center">
                                <span class="text-sm font-semibold ">Casier</span>
                                <!-- <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ order.casier }}</span> -->
                                <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ casiersRecap }}</span>
                            </div>
                        </div>

                        <!-- Packs -->
                        <div v-if="order.packs" class="flex items-start space-x-2">
                            <!-- <div class="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div> -->
                            <div class="flex items-center">
                                <span class="text-sm font-semibold ">Packs</span>
                                <!-- <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ order.packs }}</span> -->
                                <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ packsRecap }}</span>
                            </div>
                        </div>
                    </div>



                    <!-- Total -->
                    <div class="mb-4 flex items-center justify-between">
                        <div class=" font-medium text-gray-800">
                            Total
                        </div>
                        <div class=" font-bold text-gray-900">
                            {{ subtotal }} FCFA
                        </div>
                    </div>

                    <Button type="submit" class="w-full py-5 text-sm rounded-[90px] bg-primary-50 hover:bg-primary-60 ">
                        valider ma commande
                    </Button>

                    <RouterLink :to="{ name: AppRoute.HOME.name }"
                        class=" text-xs cursor-pointer font-medium hover:underline text-center mt-3">
                        Retour a l'accueil
                    </RouterLink>

                </div>
            </section>
        </div>
    </form>
</template>

<script setup lang="ts">
import InputField from '@/components/vee-validate/InputField.vue';
import SelectField from '@/components/vee-validate/selectField.vue';
import TextareaField from '@/components/vee-validate/TextareaField.vue';
import { computed, ref, type PropType } from 'vue';
import OrderCard from '../card/orders/orderCard.vue';
import Button from '@/components/ui/button/Button.vue';
import { AppRoute } from '@/constants/app-route';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useMutation } from '@tanstack/vue-query';
import type { CartLine, CreateOrderPayload, DeliveryPayload, ProductResponse } from '@/services/locker-products/locker-products-type';
import { useCreateOrderMutation } from '@/composables/queries/useOrderQueries';
import { z } from 'zod';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useToast } from 'vue-toastification';
import { useCart } from '@/composables/queries/useCart';
import { storeToRefs } from 'pinia';

const deliverySchema = z.object({
    fullName: z.string()
        .min(3, 'Le nom complet doit contenir au moins 3 caractères')
        .max(100, 'Le nom complet ne peut pas dépasser 100 caractères')
        .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes'),

    phone: z.string()
        .regex(/^(01|05|07)\d{8}$/, 'Le numéro doit commencer par 01, 05 ou 07 et contenir exactement 10 chiffres'),

    common: z.string()
        .min(1, 'Veuillez sélectionner une commune'),

    deliveryAdress: z.string()
        .min(5, 'L\'adresse de livraison doit contenir au moins 5 caractères')
        .max(200, 'L\'adresse ne peut pas dépasser 200 caractères'),

    instructions: z.string()
        .max(500, 'Les instructions ne peuvent pas dépasser 500 caractères')
        .optional()
        .or(z.literal(''))
});

const { cart } = storeToRefs(useCart());
const { formatCartLineToOrderPayload, total } = useCart();

const { startLoading, stopLoading } = useLoaderStore();

const router = useRouter();
const toast = useToast();

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(deliverySchema)
});

defineProps({
    order: {
        type: Object as PropType<{
            id: string;
            title: string;
            casier: string;
            packs: string;
            total: number;
        }>,
        required: true
    }
})


const deliveryState = ref<DeliveryPayload>(
    {
        fullName: undefined,
        phone: undefined,
        common: undefined,
        deliveryAdress: undefined,
        instructions: undefined

    }
);
const goToSuccessPage = () => {
    console.log('go to success page');
    router.push({ name: AppRoute.DELIVERY_SUCCESS.name });
}

const createOrderHandler = async () => {
    const items = formatCartLineToOrderPayload();
    const payload: CreateOrderPayload = {
        delivery: {
            full_name: deliveryState.value.fullName!,
            phone_number: deliveryState.value.phone!,
            municipality: deliveryState.value.common!,
            address: deliveryState.value.deliveryAdress!,
            notes: deliveryState.value.instructions!,
        },
        order: {
            items: items
        }
    }
    try {
        startLoading();
        await createOrder(payload);
        resetForm();
        toast.success("La commande a bien été créee");
        goToSuccessPage();
    } catch (err) {

    } finally {
        stopLoading();
    }

}

const { mutateAsync: createOrder } = useCreateOrderMutation();

const onSubmit = handleSubmit(async () => {
    await createOrderHandler();
});


const casiersRecap = computed(() => {
    const casiers = cart.value.filter(
        (line: CartLine) => line.type === 'full-locker' || line.type === 'locker'
    );

    if (casiers.length === 0) return null;

    const productQuantities: Record<string, { name: string; quantity: number }> = {};

    casiers.forEach((line: CartLine) => {
        line.products.forEach((product) => {
            const totalQuantity = line.quantity * product.quantity;
            const productId = product.product.id;

            if (productQuantities[productId]) {
                productQuantities[productId].quantity += totalQuantity;
            } else {
                productQuantities[productId] = {
                    name: product.product.name,
                    quantity: totalQuantity
                };
            }
        });
    });

    const items = Object.values(productQuantities).map(
        ({ quantity, name }) => `${quantity}x ${name}`
    );

    return items.join(', ');
});

// Récapitulatif des packs (eau)
// const packsRecap = computed(() => {
//     const packs = cart.value.filter(
//         (line: CartLine) => line.type === 'water'
//     );

//     if (packs.length === 0) return null;

//     const items: string[] = [];

//     packs.forEach((line: CartLine) => {
//         line.products.forEach((product) => {
//             const totalQuantity = line.quantity * product.quantity;
//             items.push(`${totalQuantity}x ${product.product.name}`);
//         });
//     });

//     return items.join(', ');
// });
const packsRecap = computed(() => {
    const packs = cart.value.filter(
        (line: CartLine) => line.type === 'water'
    );

    if (packs.length === 0) return null;

    const productQuantities: Record<string, { name: string; quantity: number }> = {};

    packs.forEach((line: CartLine) => {
        line.products.forEach((product) => {
            const totalQuantity = line.quantity * product.quantity;
            const productId = product.product.id;

            if (productQuantities[productId]) {
                productQuantities[productId].quantity += totalQuantity;
            } else {
                productQuantities[productId] = {
                    name: product.product.name,
                    quantity: totalQuantity
                };
            }
        });
    });

    const items = Object.values(productQuantities).map(
        ({ quantity, name }) => `${quantity}x ${name}`
    );

    return items.join(', ');
});



const productsDataGrouped = (products: ProductResponse[], type: "locker" | "full-locker" | "water") => {
    const groupedMap = new Map<string, ProductResponse>();

    let setProducts = products;

    if (type === "locker") {

        setProducts = Array.from(new Set(products));
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

</script>

<style scoped></style>