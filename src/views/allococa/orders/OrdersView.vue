<template>
    <div class="py-10 spac-y-5 pt-[110px]   maxContain3xl ">
        <section class="flex flex-col space-y-5 lg:space-y-0 lg:flex-row items-center justify-between ">

            <h3 class="text-clamp-md font-bold font-tcc">Mes commandes</h3>
            <div class="flex flex-col lg:flex-row items-center gap-3  ">

                <div class="sm:min-w-[320px] w-full">

                    <SearchBar placeholder="Rechercher une commande"></SearchBar>
                </div>
                <CommonDatesFilter :can-reset-filter="true" :update-handler="updateData" @reset-filter="resetFilter"
                    v-model="dates">
                </commonDatesFilter>
            </div>
        </section>

        <article class="flex flex-col justify-between items-center  min-h-[calc(100vh-250px)] ">

            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                <OrderCard v-for="order in ordersData?.items" :order="order" :key="order.id"></OrderCard>
            </section>


            <div class="w-fit space-x-2">

                <CommonPagination v-if="isFetched" :items-per-page="10" :current-page="filters.page"
                    @go-to-page="goToPage" @next-page="goNextPage" @prev-page="goPrevPage" :total="ordersData?.total" />
            </div>
        </article>

    </div>
</template>

<script setup lang="ts">
import OrderCard from '@/components/allococa/card/orders/orderCard.vue';
import CommonDatesFilter from '@/components/common/commonDatesFilter.vue';
import CommonPagination from '@/components/common/commonPagination.vue';
import SearchBar from '@/components/users/SearchBar.vue';
import { useOrdersFiltersQuery } from '@/composables/queries/useOrderQueries';
import { useLoaderStore } from "@/stores/useLoaderStore";
import type { DateRange } from "radix-vue";
import { ref, type Ref } from "vue";

const { filters, data: ordersData, isFetched, } = useOrdersFiltersQuery();

const { startLoading, stopLoading, startLoadingSkeleton } = useLoaderStore();

let date = new Date()




const dates = ref({
    start: undefined,
    end: undefined,
    // start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    // end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>

const resetFilter = () => {
    console.log("reset");
    dates.value = {
        start: undefined,
        end: undefined,
    };
    filters.dates = [];
}

const updateData = () => {

    console.log("wataru");
    const startDate = dates.value.start!.toDate('Africa/Abidjan')
    const endDate = dates.value.end!.toDate('Africa/Abidjan')
    filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
    startLoadingSkeleton();
}


const goNextPage = async () => {
    // currentPage.value++
    filters.page++

}
const goToPage = async (page: number) => {
    // currentPage.value++
    filters.page = page
}

const goPrevPage = () => {
    // currentPage.value--
    filters.page--
}


</script>

<style scoped></style>