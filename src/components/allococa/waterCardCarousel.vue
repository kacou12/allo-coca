<template>
    <div class="w-full  relative">

        <Carousel :plugins="[Autoplay({
            delay: 5000,
        })]" :opts="{
            loop: true,
        }" class="z-10 w-full h-full relative " v-slot="{ canScrollNext, canScrollPrev, scrollNext, scrollPrev }">
            <CarouselContent>
                <CarouselItem v-for="product in productsData!.items" :key="product.id"
                    class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <WaterCard :product="product"></WaterCard>
                </CarouselItem>
                <!-- <CarouselItem class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <WaterCard></WaterCard>
                </CarouselItem>
                <CarouselItem class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <WaterCard></WaterCard>
                </CarouselItem>
                <CarouselItem class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <WaterCard></WaterCard>
                </CarouselItem> -->

            </CarouselContent>




        </Carousel>
        <!-- <div
            class="z-0 absolute left-0 right-0 bottom-0 to  bg-[#FFFFFF4D] border-t-2 border-t-[#FFFFFF4D] rounded-b-2xl">
        </div> -->


    </div>
</template>

<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { Product } from '@/services/locker-products/locker-products-type';
import Autoplay from 'embla-carousel-autoplay';
import type { PropType } from 'vue';
import WaterCard from './card/waterCard.vue';
import { useProductsByCategoryQuery } from '@/composables/queries/useProductsQueries';


const { categoryId } = defineProps({
    categoryId: {
        type: String,
        required: true
    }
})

const { data: productsData, isFetched, isLoading } = useProductsByCategoryQuery(categoryId)


</script>
