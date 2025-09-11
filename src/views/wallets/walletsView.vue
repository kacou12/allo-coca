<template>
    <div class="px-4 h-full">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-xl font-bold font-merriweathersans leading-6 text-black">Gestion des vos soldes</h1>
                <p class="text-neutral-30 text-sm font-normal">Suivez, gérez et prévoyez les actions de vos utilisateurs
                </p>
            </div>

            <div>
                <notification-icon></notification-icon>
            </div>
        </header>
        <!-- Filtres dates  -->
        <section class="flex  flex-col  md:flex-row my-5 gap-5 justify-between w-full ">
            <div class="h-10  w-full">

                <DashboardTabs v-model="tabsValue" class="w-full "></DashboardTabs>

            </div>

            <div class="gap-3  w-full  md:w-[60%] 2xl:w-[50%]  flex justify-start lg:justify-end">

                <CommonDatesFilter :update-handler="updateData" v-model="dates"></commonDatesFilter>

            </div>
        </section>
        <!-- Filtres en haut -->
        <section class="flex justify-center ">
            <div class="lg:w-1/2 w-full  space-y-5 ">
                <FadeSlideAnimation>

                    <main v-if="isFetchedStats" class="flex  gap-5 flex-col xs:flex-row ">
                        <WalletCard class="xs:flex-1" :amount="merchantStatsData!.balance_cashout.toString()" :id="2"
                            title="Solde collecte "></WalletCard>
                        <WalletCard class="xs:flex-1" :amount="merchantStatsData!.balance_cashin.toString()" :id="3"
                            title="Solde transfert "></WalletCard>

                    </main>
                    <main v-else class="flex  gap-5 flex-col xs:flex-row  ">
                        <Skeleton class="xs:flex-1 rounded-lg h-[214px]" />
                        <Skeleton class="xs:flex-1 rounded-lg h-[214px]" />
                    </main>
                </FadeSlideAnimation>

                <div class="flex gap-5 flex-col xs:flex-row">

                    <WalletDepositModal></WalletDepositModal>

                    <!-- <CustomButton type="outline">
                        <ArrowDownCircle></ArrowDownCircle>
                        Retrait
                    </CustomButton> -->

                    <WalletWithdrawalModal></WalletWithdrawalModal>
                    <!-- <CustomButton type="destructive">
                        <ArrowUpLeftSquare></ArrowUpLeftSquare>
                        Transfert
                    </CustomButton> -->
                    <!-- <WalletTransferModal></WalletTransferModal> -->
                </div>

            </div>

        </section>

        <section class="lg:w-[60%] mx-auto my-5 space-y-4 ">

            <h2 class="text-lg text-black ">Historique des demandes </h2>

            <CommonDataTable :dynamic-width-columns="false" :page-size="limitModel ? parseInt(limitModel) : 10"
                ref="my-table" :default-page="filters.page" :total="merchantRequestsData?.total ?? 0"
                :columns="walletTransactionsColumn" :data="merchantRequestsData?.items ?? []" @go-to-page="goToPage"
                @prev-page="prevPage" @next-page="nextPage">
            </CommonDataTable>

        </section>




    </div>
</template>

<script setup lang="ts">

import CommonDataTable from '@/components/common/commonDataTable.vue';
import CommonDatesFilter from '@/components/common/commonDatesFilter.vue';
import DashboardTabs from '@/components/main/dashboard/dashboardTabs.vue';
import FadeSlideAnimation from "@/components/animations/fadeSlideAnimation.vue";
import WalletDepositModal from "@/components/main/wallet/modals/walletDepositModal.vue";
import WalletTransferModal from "@/components/main/wallet/modals/walletTransferModal.vue";
import WalletWithdrawalModal from "@/components/main/wallet/modals/walletWithdrawalModal.vue";
import { walletTransactionsColumn } from "@/components/main/wallet/table/walletTransactionTableColumn";
import notificationIcon from '@/components/svg/notificationIcon.vue';
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import WalletCard from "@/components/wallets/walletCard.vue";
import { useMerchantRequestsFiltersQuery, useMerchantStatsFiltersQuery } from "@/composables/useMerchantRequestQueries";
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useMerchantRequestStore } from "@/stores/useMerchantRequestStore";
import {
    CalendarDate
} from '@internationalized/date';
import type { DateRange } from "radix-vue";
import { ref, type Ref, watch } from "vue";

const filters = useMerchantRequestStore()

const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();


const { isFetched, data: merchantRequestsData, isFetching } = useMerchantRequestsFiltersQuery();
const { isFetched: isFetchedStats, data: merchantStatsData, isFetching: isFetchingStats } = useMerchantStatsFiltersQuery();


const tabsValue = ref("0");
let date = new Date();

const dates = ref({
    start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>


const updateData = () => {
    tabsValue.value = "";
    const startDate = dates.value.start!.toDate('Africa/Abidjan')
    const endDate = dates.value.end!.toDate('Africa/Abidjan')
    filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
}

watch(tabsValue, (n, o) => {
    if (n == "") return;
    // yesterday
    if (n == "1") {
        dates.value = {
            start:
                new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()).subtract({ days: parseInt("1") }),
            end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()).subtract({ days: parseInt("1") }),
        }

    } else {
        dates.value = {
            start:
                new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()).subtract({ days: parseInt(n) }),
            end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
        }

    }
    filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
})


const [statusModel,] = defineModel('status', {
    set(value: string) {
        if (value == "all") {
            filters.status = undefined;
        } else {
            filters.status = value;
        }
        return value
    },
    default: undefined,
})

const [typeModel,] = defineModel('type', {
    set(value: string) {
        if (value == "all") {
            filters.type = undefined;
        } else {
            filters.type = value;
        }
        return value
    },
    default: undefined,
})


const [limitModel, limitModifiers] = defineModel('limitProvider', {
    type: String,

    set(value: string) {
        filters.limit = parseInt(value);
        return value
    },
    default: undefined,
})



const nextPage = async () => {
    filters.page = filters.page + 1;
    startLoadingSkeleton();
}

const goToPage = async (page: number) => {
    filters.page = page
    startLoadingSkeleton();
}

const prevPage = async () => {
    filters.page = filters.page - 1;
    startLoadingSkeleton();
}




</script>

<style scoped></style>