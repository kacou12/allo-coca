<template>
    <div class="w-full relative">

        <Carousel :plugins="[Autoplay({
            delay: 5000,
        })]" :opts="{
            loop: true,
        }" class="z-10 w-full h-full relative" v-slot="{ canScrollNext, canScrollPrev, scrollNext, scrollPrev }">
            <CarouselContent>
                <CarouselItem class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <slot></slot>
                </CarouselItem>
            </CarouselContent>
        </Carousel>

    </div>
</template>

<script setup lang="ts">
import { Carousel, CarouselContent } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

// Il n'y a plus besoin de la prop `beverages` car le contenu est passé via le slot
// const props = defineProps<{ beverages: Beverage[] }>();
</script>

<style scoped>
/* No specific styles needed, Tailwind CSS handles it */
</style>