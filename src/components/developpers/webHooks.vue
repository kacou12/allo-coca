<template>
    <div id="true" class="bg-white rounded-lg shadow-md p-6 my-4 ">
        <section class="flex justify-between flex-col md:flex-row mb-5 ">
            <div>
                <h2 class="text-xl font-semibold mb-2">Webhooks</h2>
                <p class="text-gray-600 mb-6">
                    Create and manage your webhooks
                </p>
            </div>
            <div v-show="isActiveAccount && (canAddLiveKey || canAddSandboxKey)">
                <WebHooksModal :can-add-live-key="canAddLiveKey" :can-add-sandbox-key="canAddSandboxKey" />
            </div>
        </section>

        <section class="w-full overflow-x-auto">
            <div class="min-w-[600px]">

                <table class="w-full mb-6">
                    <thead>
                        <tr class="border-b">
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">Name</th>
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">Environnement</th>
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">URL</th>
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">Secret key</th>
                            <th class="py-2 text-right text-gray-500 font-medium text-sm">Actions</th>
                        </tr>
                    </thead>

                    <Transition name="fade-slide" mode="out-in">
                        <!-- Skeleton Body: Affiche pendant le chargement initial -->
                        <tbody v-if="isFetchingMerchantWebhooks">
                            <tr v-for="i in 3" :key="i" class="border-b">
                                <td class="py-3">
                                    <Skeleton class="h-4 w-5/6" />
                                </td>
                                <td class="py-3">
                                    <Skeleton class="h-4 w-5/6" />
                                </td>
                                <td class="py-3">
                                    <Skeleton class="h-4 w-full" />
                                </td>
                                <td class="py-3">
                                    <Skeleton class="h-4 w-3/4" />
                                </td>
                                <td class="py-3">
                                    <div class="flex justify-end gap-2">
                                        <Skeleton class="h-8 w-8 rounded" />
                                        <Skeleton class="h-8 w-8 rounded" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                        <!-- Data Body: Affiche une fois les données chargées -->
                        <tbody v-else>
                            <!-- Message si aucun webhook n'est trouvé -->
                            <tr v-if="merchantWebhooksData!.items.length === 0">
                                <td colspan="5" class="py-4 text-center text-gray-500 text-sm" height="100">No webhooks
                                    found</td>
                            </tr>
                            <!-- Lignes de données des webhooks -->
                            <tr v-for="webhook in merchantWebhooksData!.items" :key="webhook.id" class="border-b">
                                <td class="py-3 font-mono text-sm">
                                    <span>{{ webhook.name }}</span>
                                </td>
                                <td class="py-3">
                                    <span
                                        class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">{{
                                            webhook.environment }}</span>
                                </td>
                                <td class="py-3 font-mono text-sm">
                                    <span>{{ webhook.url }}</span>
                                </td>
                                <td class="py-3 font-mono text-sm">
                                    <span>{{ webhook.secret }}</span>
                                </td>
                                <td class="py-3 text-right">
                                    <div class="flex justify-end gap-2">
                                        <WebhookAndKeyClipBoard successMessage="La secret key a été copiée avec succes"
                                            :dataToCopy="webhook.secret"></WebhookAndKeyClipBoard>

                                        <ConfirmModal v-if="isActiveAccount"
                                            :confirmHandler="() => deleteWebhookHandler(webhook.id)"
                                            confirm-text="Voulez vous vraiment supprimer ce webhook ?">
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

interface Token {
    id: string;
    name: string;
    value: string;
    createdAt: Date;
}

import { useDeleteWebhookMutation, useWebhookFiltersQuery } from '@/composables/queries/useWebhookQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useRoute } from 'vue-router';
import WebHooksModal from './modals/webHooksModal.vue';
import ConfirmModal from '../modals/confirmModal.vue';
import Skeleton from '../ui/skeleton/Skeleton.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';
import { useToast } from 'vue-toastification';
import { computed } from 'vue';
import { EnvironmentsEnum, MerchantStatusEnum } from '@/constants/constant.enum';
import { useAuthProfilQuery } from '@/composables/queries/useAuthQueries';
import WebhookAndKeyClipBoard from './webhookAndKeyClipBoard.vue';

const route = useRoute();
const toast = useToast();
const { startLoading, stopLoading, stopLoadingSkeleton } = useLoaderStore();

const { mutateAsync: deleteWebhook } = useDeleteWebhookMutation(route.params.id as string);
const { isFetched: isFetchedMerchantWebhooks, data: merchantWebhooksData, isFetching: isFetchingMerchantWebhooks } = useWebhookFiltersQuery();
const { data: user, refetch: refetchUserProfil, isLoading, isFetched, isFetching } = useAuthProfilQuery({ enabled: true });

const isActiveAccount = computed(() => user.value?.merchant?.status === MerchantStatusEnum.active);




const canAddLiveKey = computed(() => {
    if (!isFetchedMerchantWebhooks.value) return false;
    return merchantWebhooksData.value!.items.filter((webhook) => webhook.environment === EnvironmentsEnum.Live).length === 0;
});
const canAddSandboxKey = computed(() => {
    if (!isFetchedMerchantWebhooks.value) return false;
    return merchantWebhooksData.value!.items.filter((webhook) => webhook.environment === EnvironmentsEnum.Sandbox).length === 0;
});





const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    toast.info("La secret key a bien été copiée");
};

const deleteWebhookHandler = async (id: string) => {
    try {
        startLoading();
        await deleteWebhook(id);
        toast.success("Le webhook a bien été supprimé");
    } catch (err) {

    } finally {
        stopLoading();
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