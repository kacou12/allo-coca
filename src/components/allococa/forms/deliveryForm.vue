<template>
    <div class="  flex flex-col md:flex-row gap-10 ">
        <section class="flex-1 order-2 md:order-1">
            <div>
                <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="email">
                    Prénom & Nom
                </label>
                <InputField name="fullName" v-model="deliveryState.fullName" type="text" id="fullName"
                    placeholder="Prénom & Nom" class="py-2 pr-12" required>
                </InputField>
            </div>

            <div>
                <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="email">
                    Numéro de téléphones
                </label>
                <InputField name="fullName" v-model="deliveryState.phone" type="text" id="fullName"
                    placeholder="Numéro de téléphone" class="py-2 pr-12" required>
                </InputField>
            </div>


            <div>
                <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="commune">
                    Commune
                </label>
                <SelectField name="Commune" v-model="deliveryState.common" border-color="border-neutral-60"
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
                <InputField name="fullName" v-model="deliveryState.deliveryAdress" type="text" id="fullName"
                    placeholder="Ex: Cocody angré" class="py-2 pr-12" required>
                </InputField>
            </div>

            <div>
                <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="instructions">
                    Instructions de livraison (optionnel)
                </label>
                <TextareaField name="instructions" v-model="deliveryState.instructions" type="text" id="instructions"
                    placeholder="" class="py-2 pr-12" required>
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
                            <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ order.casier }}</span>
                        </div>
                    </div>

                    <!-- Packs -->
                    <div v-if="order.packs" class="flex items-start space-x-2">
                        <!-- <div class="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div> -->
                        <div class="flex items-center">
                            <span class="text-sm font-semibold ">Packs</span>
                            <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ order.packs }}</span>
                        </div>
                    </div>
                </div>



                <!-- Total -->
                <div class="mb-4 flex items-center justify-between">
                    <div class=" font-medium text-gray-800">
                        Total
                    </div>
                    <div class=" font-bold text-gray-900">
                        {{ order.total }} FCFA
                    </div>
                </div>

                <Button @click="goToSuccessPage"
                    class="w-full py-5 text-sm rounded-[90px] bg-primary-50 hover:bg-primary-60 ">
                    valider ma commande
                </Button>

                <RouterLink :to="{ name: AppRoute.HOME.name }"
                    class=" text-xs cursor-pointer font-medium hover:underline text-center mt-3">
                    Retour a l'accueil
                </RouterLink>

            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import InputField from '@/components/vee-validate/InputField.vue';
import SelectField from '@/components/vee-validate/selectField.vue';
import TextareaField from '@/components/vee-validate/TextareaField.vue';
import { ref, type PropType } from 'vue';
import OrderCard from '../card/orders/orderCard.vue';
import Button from '@/components/ui/button/Button.vue';
import { AppRoute } from '@/constants/app-route';
import router from '@/router';

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


const deliveryState = ref(
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

</script>

<style scoped></style>