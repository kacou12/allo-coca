<template>
    <div class="w-full  relative" v-if="isFetched">

        <Carousel :plugins="[Autoplay({
            delay: 5000,
        })]" :opts="{
            loop: true,
        }" class="z-10 w-full h-full relative " v-slot="{ canScrollNext, canScrollPrev, scrollNext, scrollPrev }">
            <CarouselContent>
                <!-- <CarouselItem v-for="product in products" :key="product.id"
                    class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <BeverageCard :product="product"  ></BeverageCard>
                </CarouselItem> -->
                <CarouselItem v-for="product in productsData!.items" :key="product.id"
                    class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <BeverageCard :product="product"></BeverageCard>
                </CarouselItem>
                <!-- <CarouselItem class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <BeverageCard :product="products[0]"></BeverageCard>
                </CarouselItem>
                <CarouselItem class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <BeverageCard :product="products[0]"></BeverageCard>
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
import { useProductsByCategoryQuery } from '@/composables/queries/useProductsQueries';
import Autoplay from 'embla-carousel-autoplay';
import BeverageCard from './card/beverageCard.vue';

const { categoryId } = defineProps({
    categoryId: {
        type: String,
        required: true
    }
})

const { data: productsData, isFetched, isLoading } = useProductsByCategoryQuery(categoryId)

</script>