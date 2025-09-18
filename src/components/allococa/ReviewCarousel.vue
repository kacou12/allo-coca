<template>
    <div class="w-full relative">

        <Carousel :plugins="[Autoplay({
            delay: 5000,
        })]" :opts="{
            loop: true,
        }" class="z-10 w-full h-full relative " v-slot="{ canScrollNext, canScrollPrev, scrollNext, scrollPrev }">
            <CarouselContent>
                <CarouselItem class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                    <ReviewCard avatar="/src/assets/allococa/home/clients/avatar-1.png"
                        customer-name="Fatou B., Yopougon" :rating="5"
                        review-text="J'ai reçu mon casier en moins de 2h !Très pratique pour mes soirées entre amis.">
                    </ReviewCard>
                </CarouselItem>
                <CarouselItem class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                    <ReviewCard avatar="/src/assets/allococa/home/clients/avatar-2.png"
                        customer-name="Kouassi M., Cocody" :rating="5"
                        review-text="C'est trop cool de pouvoir mélanger Coca, Fanta et Sprite dans le même casier !">
                    </ReviewCard>
                </CarouselItem>
                <CarouselItem class=" md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                    <ReviewCard avatar="/src/assets/allococa/home/clients/avatar-3.png" customer-name="Aya K., Marcory"
                        :rating="5"
                        review-text="Service client au top sur WhatsApp. Ils ont remplacé une bouteille abîmée le jour même !">
                    </ReviewCard>
                </CarouselItem>


            </CarouselContent>




        </Carousel>
        <!-- <div
            class="z-0 absolute left-0 right-0 bottom-0 to  bg-[#FFFFFF4D] border-t-2 border-t-[#FFFFFF4D] rounded-b-2xl">
        </div> -->


    </div>
</template>

<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ArrowLeft, ArrowRight, ShoppingBasket } from 'lucide-vue-next';
import { Button } from '../ui/button';
import Autoplay from 'embla-carousel-autoplay'
import CustomButton from '../buttons/customButton.vue';
import BeverageCard from './card/beverageCard.vue';
import ReviewCard from './card/reviewCard.vue';


// const { orientation, canScrollPrev, scrollPrev } = useCarousel()

// const { orientation, canScrollNext, scrollNext, canScrollPrev, scrollPrev } = useCarousel()

const carousselItems = [
    "“Simplifiez vos paiements de masse avec Sendchap Business, la solution efficace pour vos transactions d’entreprise.”",
    "“Automatisez et centralisez vos paiements de masse en quelques clics, sans les tracas des virements multiples”",
    "“Envoyez des paiements à travers plusieurs réseaux de mobile money (Moov, Orange, MTN, Wave), garantissant une couverture maximale et une flexibilité accrue”",
    "“Accédez à des Analyse de donnéess détaillés et en temps réel pour suivre vos transactions et optimiser la gestion financière de votre entreprise.”"

]

</script>

<style scoped></style>