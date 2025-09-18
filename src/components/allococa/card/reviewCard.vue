<template>
    <div class="flex flex-col justify-center space-y-3 px-2 py-5 bg-[#F6F6F6] rounded-lg items-center ">
        <section class="flex gap-1 items-center">
            <Star v-for="star in rating" :key="star" :size="16" class="text-[#FDB022]" />
        </section>

        <img class="w-[80px] h-[80px] object-cover rounded-full" :src="avatarUrl" :alt="customerName" />

        <div class="h-[50px]">
            <p class="text-sm text-[#4F4F4F] line-clamp-2 text-center">{{ reviewText }}</p>
        </div>

        <p class="text-[#1E1E1E] font-semibold">{{ customerName }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { Star } from 'lucide-vue-next';

const props = defineProps({
    rating: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
});

const avatarUrl = computed(() => {
    //   return new URL(`../assets/allococa/home/clients/${props.avatar}`, import.meta.url).href;
    return new URL(`../../../assets/allococa/home/clients/${props.avatar}`, import.meta.url).href;
});
</script>

<style scoped>
/* Les styles restent inchangés */
</style>