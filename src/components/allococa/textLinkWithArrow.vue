<template>
    <!-- <div class="flex items-center gap-1">
        <Button variant="link" class="font-medium">{{ text }}</Button>
        <ArrowRight></ArrowRight>
    </div> -->
    <div class="flex items-center gap-[5px]">
        <Button variant="link" :class="color" class="px-0">{{ text }}</Button>
        <div class=" flex items-center mt-1">
            <ArrowRight class="text-white" :size="16"></ArrowRight>
        </div>
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
    color: {
        type: String,
        default: 'text-black'
    }
})

</script>

<style scoped></style>