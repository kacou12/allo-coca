<template>
    <div class="flex gap-2 rounded-xl bg-white p-6">
        <section>
            <img :src="iconUrl" :alt="title">
        </section>
        <section class="space-y-1">
            <p class="font-bold">{{ title }}</p>
            <p class="text-sm text-[#4F4F4F]">{{ description }}</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

// Définit les props que le composant attend
const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

// Crée une URL dynamique pour l'image
const iconUrl = computed(() => {
    return new URL(props.icon, import.meta.url).href;
});
</script>

<style scoped>
/* Les styles restent inchangés */
</style>