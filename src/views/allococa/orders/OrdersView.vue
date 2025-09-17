<template>
    <div class="py-10 spac-y-5 pt-[110px]   maxContain3xl ">
        <section class="flex items-center justify-between">

            <h3 class="text-clamp-md font-bold font-tcc">Mes commandes</h3>
            <div class="flex items-center gap-3">

                <div class="min-w-[320px]">

                    <SearchBar placeholder="Rechercher une commande"></SearchBar>
                </div>
                <CommonDatesFilter :update-handler="updateData" v-model="dates"></commonDatesFilter>
            </div>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            <OrderCard v-for="order in fakeOrders" :order="order" :key="order.id"></OrderCard>
        </section>
    </div>
</template>

<script setup lang="ts">
import OrderCard from '@/components/allococa/card/orders/orderCard.vue';
import CommonDatesFilter from '@/components/common/commonDatesFilter.vue';
import SearchBar from '@/components/users/SearchBar.vue';
import { useAuthStore } from "@/stores/useAuthStore";
import { useLoaderStore } from "@/stores/useLoaderStore";
import { useTransactionFiltersStore } from "@/stores/useTransactionFilterStore";
import {
    CalendarDate
} from '@internationalized/date';
import { useWindowSize } from '@vueuse/core';
import { ArrowRight } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import type { DateRange } from "radix-vue";
import { ref, watch, type Ref } from "vue";

let date = new Date();

const dates = ref({
    start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>


const fakeOrders = ref(
    [
        {
            id: "1",
            title: "Commande du 15 mai 2025",
            casier: "Coca x72, Fanta x5, Sprite x6",
            packs: "Eau naturelle x1, Citron x1",
            total: 7200
        },
        {
            id: "2",
            title: "Commande du 2 mai 2025",
            casier: "Coca x24",
            total: 5500
        },
        {
            id: "3",
            title: "Commande du 15 mai 2025",
            packs: "Eau aromatisée Citron x8",
            total: 7200
        },
        {
            id: "4",
            title: "Commande du 15 mai 2025",
            casier: "Coca x8, Sprite x6",
            packs: "Eau naturelle x2",
            total: 6400
        },
        {
            id: "5",
            title: "Commande du 28 avril 2025",
            casier: "Fanta x12, Sprite x24, Coca x6",
            total: 8900
        },
        {
            id: "6",
            title: "Commande du 22 avril 2025",
            packs: "Eau gazeuse x5, Eau citron x3",
            total: 3200
        },
        {
            id: "7",
            title: "Commande du 18 avril 2025",
            casier: "Coca x48, Orangina x12",
            packs: "Eau naturelle x4",
            total: 9600
        },
        {
            id: "8",
            title: "Commande du 10 avril 2025",
            casier: "Sprite x36",
            total: 4800
        },
        {
            id: "9",
            title: "Commande du 5 avril 2025",
            packs: "Eau aromatisée x6, Eau gazeuse x2",
            total: 2400
        },
        {
            id: "10",
            title: "Commande du 1er avril 2025",
            casier: "Coca x60, Fanta x24, Sprite x12",
            packs: "Eau naturelle x6",
            total: 12500
        },
        {
            id: "11",
            title: "Commande du 25 mars 2025",
            casier: "Orangina x18, Coca x30",
            total: 7800
        },
        {
            id: "12",
            title: "Commande du 20 mars 2025",
            packs: "Eau citron x10",
            total: 4000
        },
        {
            id: "13",
            title: "Commande du 15 mars 2025",
            casier: "Sprite x24, Fanta x36",
            packs: "Eau gazeuse x3",
            total: 8200
        },
        {
            id: "14",
            title: "Commande du 10 mars 2025",
            casier: "Coca x96",
            total: 11200
        },
        {
            id: "15",
            title: "Commande du 5 mars 2025",
            packs: "Eau naturelle x8, Eau aromatisée x4",
            total: 3600
        },
        {
            id: "16",
            title: "Commande du 28 février 2025",
            casier: "Fanta x48, Sprite x24",
            packs: "Eau citron x2",
            total: 9400
        },
        {
            id: "17",
            title: "Commande du 22 février 2025",
            casier: "Coca x12, Orangina x6",
            total: 3900
        },
        {
            id: "18",
            title: "Commande du 18 février 2025",
            packs: "Eau gazeuse x12",
            total: 4800
        }]
);

const updateData = () => {
    // tabsValue.value = "";
    const startDate = dates.value.start!.toDate('Africa/Abidjan')
    const endDate = dates.value.end!.toDate('Africa/Abidjan')
    // filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
}

</script>

<style scoped></style>