<template>
    <div class="bg-white rounded-lg shadow-md p-6 my-4">
        <section class="flex justify-between flex-col md:flex-row mb-5 ">
            <div>
                <h2 class="text-xl font-semibold mb-2">Manage API Tokens</h2>
                <p class="text-gray-600 mb-6 text-sm">
                    API tokens allow third-party services. You may revoke any of your existing tokens if they are no
                    longer in use.
                </p>
            </div>
            <div v-show="isActiveAccount && (canAddLiveKey || canAddSandboxKey)" class="">
                <ApiTokensModal :can-add-live-key="canAddLiveKey" :can-add-sandbox-key="canAddSandboxKey" />
            </div>
        </section>
        <section class="w-full overflow-x-auto">
            <div class="min-w-[600px]"> <!-- Largeur minimale pour assurer le défilement -->
                <table class="w-full mb-6 rounded-t-xl">
                    <thead>
                        <tr class="border-b">
                            <!-- <th class="py-2 text-left text-gray-500 font-medium text-sm">ID</th> -->
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">Name</th>
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">Environnement</th>
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">Token</th>
                            <th class="py-2 px-4 text-left text-gray-500 font-medium text-sm">Statut</th>
                            <th class="py-2 text-right text-gray-500 font-medium text-sm">Actions</th>
                        </tr>
                    </thead>

                    <Transition name="fade-slide">

                        <tbody v-if="isFetchingKeys">
                            <tr v-for="i in 3" :key="i" class="border-b">
                                <!-- <td class="py-3">
                                <Skeleton class="h-4 w-24" />
                            </td> -->
                                <td class="py-3">
                                    <Skeleton class="h-4 w-24" />
                                </td>
                                <td class="py-3">
                                    <Skeleton class="h-4 w-32" />
                                </td>
                                <td class="py-3">
                                    <Skeleton class="h-4 w-full" />
                                </td>
                                <td class="py-3">
                                    <Skeleton class="h-4 w-full" />
                                </td>
                                <td class="py-3">
                                    <div class="flex justify-end gap-2">
                                        <!-- <Skeleton class="h-8 w-8 rounded" /> -->
                                        <Skeleton class="h-8 w-8 rounded" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                        <tbody v-else-if="isFetchedKeys">
                            <tr v-if="marchantKeysData!.items.length === 0">
                                <td colspan="4" class="py-4 text-center text-gray-500">No tokens found</td>
                            </tr>
                            <tr v-for="token in marchantKeysData!.items" :key="token.id" class="border-b">
                                <!-- <td class="py-3">{{ token.id }}</td> -->

                                <td class="py-3 font-mono text-sm">
                                    <span>{{ token.name }}</span>
                                </td>

                                <td class="py-3">
                                    <span
                                        class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">{{
                                            token.environment }}</span>
                                </td>
                                <td class="py-3 font-mono text-sm">
                                    <span>••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••</span>
                                    <!-- <span>{{ token.key }}</span> -->
                                </td>

                                <td class="py-3 px-4 font-mono">
                                    <div>
                                        <span :class="`text-xs text-center font-medium px-2 py-[1px] rounded-2xl`"
                                            :style="{
                                                backgroundColor: getStatusKeyData(token.status).color,
                                                color: getStatusKeyData(token.status).textColor
                                            }">
                                            {{ getStatusKeyData(token.status).name }}</span>
                                    </div>
                                </td>

                                <td class="py-3 text-right">
                                    <div class="flex justify-end gap-2">
                                        <!-- <WebhookAndKeyClipBoard :dataToCopy="token.key"></WebhookAndKeyClipBoard> -->


                                        <ConfirmModal v-if="isActiveAccount"
                                            :confirmHandler="() => deleteTokenHandler(token.id)"
                                            :confirm-text="`Voulez vous vraiment supprimer le token ${token.name} ?`">
                                            <button class="p-1.5 bg-red-100 hover:bg-red-200 rounded transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </ConfirmModal>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Transition>
                </table>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">


import { useDeleteKeyMutation } from '@/composables/queries/useKeyQueries';
// import { useMerchantQuery } from '@/composables/queries/useMerchantQueries';
import { useRoute } from 'vue-router';
import ApiTokensModal from './modals/apiTokensModal.vue';
import { useLoaderStore } from '@/stores/useLoaderStore';
import ConfirmModal from '../modals/confirmModal.vue';
import Skeleton from '../ui/skeleton/Skeleton.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';
import { useKeysFiltersQuery } from '@/composables/queries/useKeyQueries';
import WebhookAndKeyClipBoard from './webhookAndKeyClipBoard.vue';
import { computed } from 'vue';
import { EnvironmentsEnum, KeyStatusEnum, MerchantStatusEnum } from '@/constants/constant.enum';
import { KeyStatusDataEnum } from '@/interfaces/datatable.interface';
import { useToast } from 'vue-toastification';
import { useAuthProfilQuery } from '@/composables/queries/useAuthQueries';

const route = useRoute();
const toast = useToast();


const { startLoading, stopLoading, stopLoadingSkeleton } = useLoaderStore();

const { mutateAsync: deleteKey } = useDeleteKeyMutation(route.params.id as string);
const { isFetched: isFetchedKeys, data: marchantKeysData, isFetching: isFetchingKeys } = useKeysFiltersQuery();

// const { user, isActiveAccount } = storeToRefs(useAuthStore());

const { data: user, refetch: refetchUserProfil, isLoading, isFetched, isFetching } = useAuthProfilQuery({ enabled: true });

const isActiveAccount = computed(() => user.value?.merchant?.status === MerchantStatusEnum.active);




const canAddLiveKey = computed(() => {
    if (!isFetchedKeys.value) return false;
    return marchantKeysData.value!.items.filter((key) => key.environment === EnvironmentsEnum.Live).length === 0 ||
        marchantKeysData.value!.items.filter((key) => key.environment === EnvironmentsEnum.Live).
            every((key) => key.status === KeyStatusEnum.revoked);
});
const canAddSandboxKey = computed(() => {
    if (!isFetchedKeys.value) return false;
    return marchantKeysData.value!.items.filter((key) => key.environment === EnvironmentsEnum.Sandbox).length === 0 ||
        marchantKeysData.value!.items.filter((key) => key.environment === EnvironmentsEnum.Sandbox).
            every((key) => key.status === KeyStatusEnum.revoked);
});

const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
};

function findKeyStatusDataEnumByName(searchName: string) {
    if (!searchName) return null

    const normalizedSearch = searchName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

    for (const [key, value] of Object.entries(KeyStatusDataEnum)) {
        const normalizedName = value.enumName
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')

        if (normalizedName === normalizedSearch) {
            return key
        }
    }

    return null
}

const getStatusKeyData = (status: string) => {
    const statusKey = findKeyStatusDataEnumByName(status) as keyof typeof KeyStatusDataEnum;
    const typeInfo = KeyStatusDataEnum[statusKey];
    return typeInfo;
}

const deleteTokenHandler = async (id: string) => {
    try {
        startLoading();
        await deleteKey(id);
        toast.success("Le token a bien été supprimé");
    } catch (err) {

    }
};

</script>

<style scoped>
/* Animation de fade et slide */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(-10px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(10px);
}

/* Styles pour le défilement horizontal */
.overflow-x-auto {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
}

.overflow-x-auto::-webkit-scrollbar {
    height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background-color: #edf2f7;
    border-radius: 4px;
}
</style>