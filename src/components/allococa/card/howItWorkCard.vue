<template>
    <div class="space-y-2 px-5 py-8 bg-[#F6F6F6] rounded-lg text-center ">
        <div class="flex items-center justify-center">
            <img :src="iconUrl">
        </div>
        <p class="font-bold">{{ data.title }}</p>
        <div class="max-w-[312px]">
            <p class="text-sm text-[#4F4F4F]">{{ data.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed, type PropType } from 'vue';

const { data } = defineProps({
    data: {
        type: Object as PropType<{
            title: string;
            description: string;
            image: string;
        }>,
        required: true
    }
});

const iconUrl = computed(() => {
    return new URL(`../../../assets/allococa/home/comment-ca-marche/${data.image}`, import.meta.url).href;
});
</script>

<style scoped>
/* Tu peux laisser tes styles inchangés ici */
</style>