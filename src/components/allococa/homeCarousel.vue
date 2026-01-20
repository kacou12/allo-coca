<template>
  <div class="w-full h-screen relative">
    <Carousel
      :plugins="[
        Autoplay({
          delay: 5000,
        }),
      ]"
      :opts="{
        loop: true,
      }"
      class="z-10 w-full h-full relative"
      v-slot="{ canScrollNext, canScrollPrev, scrollNext, scrollPrev }"
    >
      <CarouselContent>
        <CarouselItem class="p-0">
          <section
            class="h-screen relative bg-[url(/src/assets/allococa/banner/banner-1.jpg)] bg-cover bg-center bg-no-repeat bg-primary-50"
          >
            <article class="absolute right-0 left-0 bottom-0 w-full h-1/2">
              <div class="w-full h-full relative maxContain3xl">
                <div class="xl:w-[50%] 2xl:w-[40%] absolute bottom-[60px] ml-5 xl:ml-0 space-y-8">
                  <h1
                    class="text-clamp-h1-lg font-bold font-tcc text-white leading-[50px] md:leading-[70px]"
                  >
                    Votre casier de
                    <br />
                    Coca livré chez vous, sans bouger.
                  </h1>
                  <CustomButton
                    @click="$router.push({ name: AppRoute.PRODUCTS.name })"
                    type="default"
                    class="text-white hover:bg-primary-50"
                  >
                    <span>Je commence ma commande</span>
                    <ShoppingBasket></ShoppingBasket>
                  </CustomButton>
                </div>
              </div>
            </article>
          </section>
        </CarouselItem>
        <CarouselItem class="p-0 overflow-hidden">
          <section
            class="h-screen hidden sm:block bg-[#f40100] relative bg-[url(/src/assets/allococa/banner/banner-7.png)] bg-center bg-no-repeat md:bg-[50%_85%]"
          ></section>
          <div class="h-screen bg-[#f40100] flex flex-col items-center sm:hidden">
            <section
              class="w-full h-3/4 bg-[#f40100] bg-[url(/src/assets/allococa/banner/banner-mini-7.png)] bg-[50%_100%] bg-no-repeat md:bg-[50%_85%]"
            ></section>
          </div>
        </CarouselItem>
        <CarouselItem class="p-0">
          <section
            class="h-screen relative bg-[url(/src/assets/allococa/banner/banner-2.png)] bg-cover bg-center bg-no-repeat"
          >
            <article class="absolute right-0 left-0 bottom-0 w-full h-1/2">
              <div class="w-full h-full relative maxContain3xl">
                <div class="xl:w-[50%] 2xl:w-[40%] absolute bottom-[60px] ml-5 xl:ml-0 space-y-8">
                  <h1
                    class="text-clamp-h1-lg font-bold font-tcc text-white leading-[50px] md:leading-[70px]"
                  >
                    Votre pack d’eau<br />livré chez vous, sans bouger.
                  </h1>
                  <CustomButton
                    @click="$router.push({ name: AppRoute.PRODUCTS.name })"
                    type="default"
                    class="text-white hover:bg-primary-50"
                  >
                    <span>Je commence ma commande</span>
                    <ShoppingBasket></ShoppingBasket>
                  </CustomButton>
                </div>
              </div>
            </article>
          </section>
        </CarouselItem>

        <CarouselItem class="p-0">
          <section
            class="h-screen relative bg-[url(/src/assets/allococa/banner/banner-3.jpg)] bg-cover bg-center bg-no-repeat"
          ></section>
        </CarouselItem>

        <CarouselItem class="p-0">
          <section
            class="h-screen relative bg-[url(/src/assets/allococa/banner/banner-4.jpg)] bg-cover bg-center bg-no-repeat"
          ></section>
        </CarouselItem>

        <CarouselItem class="p-0">
          <section
            class="h-screen relative bg-[url(/src/assets/allococa/banner/banner-5.jpg)] bg-cover bg-center bg-no-repeat"
          ></section>
        </CarouselItem>

        <CarouselItem class="p-0">
          <section
            class="h-screen relative bg-[url(/src/assets/allococa/banner/banner-6.jpg)] bg-cover bg-center bg-no-repeat"
          ></section>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <!-- <div
            class="z-0 absolute left-0 right-0 bottom-0 top-0  bg-[#FFFFFF4D] border-t-2 border-t-[#FFFFFF4D] rounded-b-2xl">
        </div> -->
  </div>
</template>

<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ArrowLeft, ArrowRight, ShoppingBasket } from 'lucide-vue-next'
import { Button } from '../ui/button'
import Autoplay from 'embla-carousel-autoplay'
import CustomButton from '../buttons/customButton.vue'
import { AppRoute } from '@/constants/app-route'

// const { orientation, canScrollPrev, scrollPrev } = useCarousel()

// const { orientation, canScrollNext, scrollNext, canScrollPrev, scrollPrev } = useCarousel()

const carousselItems = [
  '“Simplifiez vos paiements de masse avec Sendchap Business, la solution efficace pour vos transactions d’entreprise.”',
  '“Automatisez et centralisez vos paiements de masse en quelques clics, sans les tracas des virements multiples”',
  '“Envoyez des paiements à travers plusieurs réseaux de mobile money (Moov, Orange, MTN, Wave), garantissant une couverture maximale et une flexibilité accrue”',
  '“Accédez à des Analyse de donnéess détaillés et en temps réel pour suivre vos transactions et optimiser la gestion financière de votre entreprise.”',
]
</script>

<style scoped></style>
