<template>
    <div class="py-10 spac-y-5 pt-[110px]   maxContain3xl  flex items-center gap-5">
        <section>
            <InputField name="fullName" v-model="deliveryState.fullName" type="text" id="fullName"
                placeholder="Prénom & Nom" class="py-2 pr-12" required>
            </InputField>

            <InputField name="fullName" v-model="deliveryState.phone" type="text" id="fullName"
                placeholder="Numéro de téléphone" class="py-2 pr-12" required>
            </InputField>

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

            <TextareaField name="deliveryAdress" v-model="deliveryState.deliveryAdress" type="text" id="deliveryAdress"
                placeholder="Instructions de livraison (optionnel)" class="py-2 pr-12" required>
            </TextareaField>
        </section>
        <section>
            <div>
                <h3 class="text-lg font-semibold text-gray-800">
                    {{ order.title }}
                </h3>

                <!-- Items de la commande -->
                <div class="space-y-2 mb-4">
                    <!-- Casier -->
                    <div v-if="order.casier" class="flex items-start space-x-2">
                        <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <span class="text-sm font-medium text-gray-700">Casier</span>
                            <span class="text-sm text-gray-600 ml-1">{{ order.casier }}</span>
                        </div>
                    </div>

                    <!-- Packs -->
                    <div v-if="order.packs" class="flex items-start space-x-2">
                        <div class="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <span class="text-sm font-medium text-gray-700">Packs</span>
                            <span class="text-sm text-gray-600 ml-1">{{ order.packs }}</span>
                        </div>
                    </div>
                </div>

                <!-- Total -->
                <div class="mb-4 flex items-center justify-between">
                    <div class=" font-bold text-gray-800">
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
}

</script>

<style scoped></style>