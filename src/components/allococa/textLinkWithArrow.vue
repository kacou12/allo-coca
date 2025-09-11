<template>
    <div class="flex items-center gap-1">
        <Button variant="link" class="font-bold">{{ text }}</Button>
        <ArrowRight></ArrowRight>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import Button from '../ui/button/Button.vue';

defineProps({
    text: {
        type: String,
        required: true,
    },
})

</script>

<style scoped></style>