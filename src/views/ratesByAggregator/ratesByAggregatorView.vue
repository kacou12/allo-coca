<template>
    <div class="p-4 bg-white shadow rounded-lg">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Taux des Réseaux par Type</h2>

        <section class="w-full">
            <div class="xl:min-w-[600px]  overflow-x-scroll md:overflow-hidden">
                <table class="w-full mb-6 rounded-t-xl ">
                    <thead>
                        <tr class="border-b bg-gray-50">
                            <th class="py-3 px-4 text-left text-gray-700 font-semibold text-sm">Réseaux</th>
                            <th class="py-3 px-4 text-left text-gray-700 font-semibold text-sm">Collecte (%)</th>
                            <th class="py-3 px-4 text-left text-gray-700 font-semibold text-sm">Transfert (%)</th>
                        </tr>
                    </thead>

                    <!-- Skeleton Loading State -->
                    <Transition name="table-fade" mode="out-in">
                        <tbody v-if="isFetching && !networkRates" key="loading-skeleton" class="skeleton-container">
                            <tr v-for="i in 5" :key="i" class="border-b skeleton-row">
                                <td class="py-3 px-4">
                                    <div class="skeleton-item h-4 w-32"></div>
                                </td>
                                <td class="py-3 px-4">
                                    <div class="skeleton-item h-4 w-24"></div>
                                </td>
                                <td class="py-3 px-4">
                                    <div class="skeleton-item h-4 w-24"></div>
                                </td>
                            </tr>
                        </tbody>

                        <!-- Data Display State -->
                        <tbody v-else-if="isFetched" class="text-sm" key="data-display">
                            <!-- No Data State -->
                            <tr v-if="!networkRates || networkRates.length === 0" class="no-data-row">
                                <td colspan="3" class="py-8 text-center text-gray-500">
                                    <div class="flex flex-col items-center">
                                        <div
                                            class="w-12 h-12 mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                                            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0v6a2 2 0 002 2h8a2 2 0 002-2v-6m-4 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v4.01">
                                                </path>
                                            </svg>
                                        </div>
                                        <p class="font-medium">Aucun taux de réseau trouvé</p>
                                        <p class="text-sm text-gray-400 mt-1">Les données seront affichées ici une fois
                                            disponibles</p>
                                    </div>
                                </td>
                            </tr>

                            <!-- Data Rows with Simple Animation -->
                            <tr v-for="(rate, index) in networkRates" :key="rate.network" :style="{
                                animationDelay: `${index * 100}ms`,
                                opacity: showData ? 1 : 0,
                                transform: showData ? 'translateX(0)' : 'translateX(-20px)'
                            }" class="border-b hover:bg-gray-50 transition-all duration-500 table-row-item">
                                <td class="py-3 px-4">
                                    <div class="flex items-center">
                                        <div class="w-2 h-2 rounded-full bg-blue-500 mr-3 network-indicator"></div>
                                        <p class="truncate font-medium">{{ rate.network }}</p>
                                    </div>
                                </td>
                                <td class="py-3 px-4">
                                    <span
                                        class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center transition-all duration-300 hover:bg-blue-200">
                                        {{ rate.collectRate }}%
                                    </span>
                                </td>
                                <td class="py-3 px-4">
                                    <span
                                        class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center transition-all duration-300 hover:bg-green-200">
                                        {{ rate.transferRate }}%
                                    </span>
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
import { useAuthProfilQuery } from '@/composables/queries/useAuthQueries';
import { ref, onMounted, computed } from 'vue';
// import type { NetworkRate } from '@/types/network';
// import Skeleton from '@/components/ui/skeleton/Skeleton.vue';

interface NetworkRate {
    network: string;
    collectRate: number;
    transferRate: number;
}


const { data: userProfil, refetch: refetchUserProfil, isLoading, isFetched, isFetching } = useAuthProfilQuery({ enabled: true });


// --- Reactive States for Data and Loading ---
// const networkRates = ref<NetworkRate[] | null>(null);
const networkRates = computed(() => {
    if (isFetched.value) {
        return userProfil.value?.merchant!.merchant_charges.map((charge) => {
            return {
                network: charge.provider.operator,
                collectRate: charge.payout_charge,
                transferRate: charge.payin_charge
            }
        })

    }
    return [];
})


const showData = ref(false);




</script>

<style scoped>
/* Enhanced Table Transitions */
.table-fade-enter-active,
.table-fade-leave-active {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.table-fade-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.table-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

/* Data Row Animation */
.table-row-item {
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    animation: slideInFromLeft 0.5s ease-out forwards;
}

@keyframes slideInFromLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Skeleton Animation */
.skeleton-container {
    position: relative;
}

.skeleton-row {
    animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.skeleton-item {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    border-radius: 4px;
    animation: skeleton-shimmer 2s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

@keyframes skeleton-pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }
}

/* Network Indicator Animation */
.network-indicator {
    animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {

    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.2);
        opacity: 0.7;
    }
}

/* No Data State Animation */
.no-data-row {
    animation: fade-in-up 0.6s ease-out;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Hover Effects */
.table-row-item:hover .network-indicator {
    animation-play-state: paused;
    transform: scale(1.2);
}

.table-row-item:hover td {
    transform: translateX(2px);
}

/* Responsive Design */
@media (max-width: 768px) {

    .table-row-enter-from,
    .table-row-leave-to {
        transform: translateY(-10px);
    }
}
</style>