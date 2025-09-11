<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <!-- <CommonButton type="default" @action="console.log('wapiti')" title="Créer un compte"></CommonButton> -->
            <!-- <CustomButton class="text-xs" variant="default" size="sm">
                <div class="flex items-center">
                    <Eye class="w-4 h-4 mr-2"></Eye>
                    <span>Examiner</span>
                </div>
            </CustomButton> -->
            <div class="cursor-pointer">
                <Eye class=""></Eye>
            </div>
        </template>

        <template #title>
            <span>RESUME DE LA REQUETE</span>
        </template>
        <template #content>
            <div class="space-y-4 p-4">
                <div class="flex justify-between items-center">
                    <span class="font-bold">Type :</span>
                    <span>{{ request.type === MerchantRequestTypeEnum.Deposit ? 'Approvisionnement' : 'Retrait'
                    }}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="font-bold">Date :</span>
                    <span>{{ formatRelativeDate(new Date(request.created_at)) }}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="font-bold">Montant :</span>
                    <span>{{ formatPrice(request.amount) }}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="font-bold">Statut :</span>
                    <div v-html="statusData">

                    </div>
                    <!-- <WalletTypeBloc :merchant-request-type="request.type as MerchantRequestTypeEnum"></WalletTypeBloc> -->
                </div>
                <div v-if="request.status === MerchantRequestStatusEnum.Rejected"
                    class="flex justify-between items-center">
                    <span class="font-bold">Raison :</span>
                    <span>{{ request.reason }}</span>
                </div>
            </div>
        </template>
        <template #footer>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import type { MerchantRequestResponse } from '@/services/merchant-request/merchant-request.type';
import { Eye } from 'lucide-vue-next';
import { computed, ref, type PropType } from 'vue';
import { useToast } from 'vue-toastification';

// import { formatPrice } from '@/lib/utils';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { MerchantRequestStatusEnum, MerchantRequestTypeEnum } from '@/constants/constant.enum';
import { formatPrice, formatRelativeDate } from '@/shared/shared';
import WalletTypeBloc from './walletTypeBloc.vue';
const toast = useToast();
const { startLoading } = useLoaderStore();

const { request } = defineProps({
    request: {
        type: Object as PropType<MerchantRequestResponse>,
        required: true,
    }
})

const statusData = computed(() => {

    let statusBadgeHtml = ''

    // Logique pour afficher le badge en fonction du statut
    switch (request.status) {
        case MerchantRequestStatusEnum.Approved:
            statusBadgeHtml = `<span class="text-xs text-center w-fit font-medium px-2 py-1 rounded-2xl bg-success-light-3 text-success-dark">Succès</span>`
            break
        case MerchantRequestStatusEnum.Pending:
            statusBadgeHtml = `<span class="text-xs text-center w-fit font-medium px-2 py-1 rounded-2xl bg-warning-dark text-warning-light-2">En attente</span>`
            break
        case MerchantRequestStatusEnum.Rejected:
            statusBadgeHtml = `<span class="text-xs text-center w-fit font-medium px-2 py-1 rounded-2xl bg-[#FFCDD2] text-[#D32F2F]">Échoué</span>`
            break
        default:
            statusBadgeHtml = `<span class="text-xs text-center w-fit font-medium px-2 py-1 rounded-2xl bg-gray-200 text-gray-800">${status}</span>`
            break
    }
    return statusBadgeHtml

});

const open = ref(false);


</script>