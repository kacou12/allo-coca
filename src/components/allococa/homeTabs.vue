<template>
    <div v-if="isFetched && categoriesData?.items">

        <CommonCocaTabs v-model="cartTabValue" :tabs="categoryTabs">

            <template v-for="category in categoriesData.items" :key="category.id" #[`${category.id}`]>
                <BeverageCarousel v-if="category.name.toLowerCase().includes('boisson')" :category-id="category.id" />
                <WaterCardCarousel v-else :category-id="category.id" />
            </template>
        </CommonCocaTabs>
    </div>
</template>

<script setup lang="ts">
import { useCategoriesQuery } from '@/composables/queries/useCategoryQueries';
import { computed, ref } from 'vue';
import BeverageCarousel from './beverageCarousel.vue';
import CommonCocaTabs from './card/commonCocaTabs.vue';
import WaterCardCarousel from './waterCardCarousel.vue';

const { data: categoriesData, isLoading, isFetched } = useCategoriesQuery()

// Première catégorie par défaut
const cartTabValue = ref<string>("")

// Générer dynamiquement les tabs depuis categoriesData
const categoryTabs = computed(() => {
    if (!categoriesData.value?.items) return []

    const tabs = categoriesData.value.items.map(category => ({
        value: category.id,
        label: category.name
    }))

    // Définir la première catégorie comme valeur par défaut
    if (tabs.length > 0 && !cartTabValue.value) {
        cartTabValue.value = tabs[0].value
    }

    return tabs
})
</script>

<style scoped></style>