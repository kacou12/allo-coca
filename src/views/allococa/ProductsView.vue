<template>

    <div class="py-10 spac-y-5 pt-[110px]   maxContain3xl ">
        <section class="flex items-center gap-1 mb-4 flex-wrap">
            <p class="text-[#6D6D6D]">Livraison:</p>
            <p class="text-primary">En 24H et gratuite </p>
            <p class="text-[#6D6D6D]">. Sur-mesure:</p>
            <p class="text-primary">100%</p>
        </section>

        <section v-if="isFetched && categoriesData?.items">
            <CommonCocaTabs v-model="cartTabValue" :tabs="tabsData">
                <template #casierComplet>
                    <FullLockerTab
                        :categoryId="categoriesData.items.filter(category => category.name.toLowerCase().includes('boisson'))[0].id">
                    </FullLockerTab>
                </template>
                <template #casierCompose>
                    <DialboxTab
                        :categoryId="categoriesData.items.filter(category => category.name.toLowerCase().includes('boisson'))[0].id">
                    </DialboxTab>
                </template>
                <template #water>
                    <MineralWaterTab
                        :categoryId="categoriesData.items.filter(category => !category.name.toLowerCase().includes('boisson'))[0].id">
                    </MineralWaterTab>
                </template>

            </commonCocaTabs>
        </section>
    </div>
</template>

<script setup lang="ts">
import CommonCocaTabs from '@/components/allococa/card/commonCocaTabs.vue';
import DialboxTab from '@/components/allococa/productsTabs/dialboxTab.vue';
import FullLockerTab from '@/components/allococa/productsTabs/fullLockerTab.vue';
import MineralWaterTab from '@/components/allococa/productsTabs/mineralWaterTab.vue';
import { useCategoriesQuery } from '@/composables/queries/useCategoryQueries';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const tabsData = ref([
    { value: 'casierComplet', label: 'Casiers complets' },
    { value: 'casierCompose', label: 'Casiers à composer' },
    { value: 'water', label: 'Eaux minérales' },
])
const cocaTabsRef = ref(0);

const route = useRoute();
const router = useRouter();

const cartTabValue = ref<"casierCompose" | "casierComplet" | "water">("casierComplet")



const { data: categoriesData, isLoading, isFetched } = useCategoriesQuery()


// const { cartTabValue } = storeToRefs(useCart())

onBeforeMount(() => {

    console.log('casierProducts', { ...route.query });
    const idCartLine = route.query.id;
    const type = route.query.type;
    if (!idCartLine || !type) {
        return;
    }
    if (type == "full-locker") {
        cartTabValue.value = "casierComplet"
    } else if (type == "locker") {
        cartTabValue.value = "casierCompose"
    }
    else if (type == "water") {
        cartTabValue.value = "water"
    }
});






</script>

<style scoped></style>