<template>
  <!-- banner section -->
  <section
    class="h-screen relative p-5 bg-[url(/src/assets/allococa/banner/banner-1.jpg)] bg-cover bg-center bg-no-repeat">
    <div class=" xl:w-[50%] 2xl:w-[30%] absolute bottom-[5%] left-[5px] xl:left-[56px] space-y-8">
      <h1 class="text-clamp-h1-lg font-bold font-tcc text-white leading-[70px]">Ton casier <br></br> Coca livré chez
        toi,
        sans bouger.
      </h1>
      <CustomButton type="default" class=" text-white   hover:bg-primary-50 ">
        <span>Je commence ma commande</span>
        <ShoppingBasket></ShoppingBasket>
      </CustomButton>
    </div>
  </section>

  <main class="maxContain3xl">
    <!-- Nos produits disponibles -->
    <section>
      <article class="flex items-start justify-between">
        <h2 class="font-bold clamp-lg">Nos produits disponibles</h2>

        <div class="space-y-3">

          <p>Compose ton casier comme tu veux ou choisis directement un pack prêt à livrer. Des bouteilles
            fraîches, des
            prix fixes, et la livraison offerte chez toi en 24h !</p>

          <div class="flex items-center gap-1">

            <Button variant="link">Configurer mon casier</Button>
            <ArrowRight></ArrowRight>
          </div>
        </div>

      </article>

      <HomeTabs></HomeTabs>

    </section>

    <!-- Vos type de commande -->
    <section class="text-center space-y-3">
      <h2>Vos type de commande</h2>
      <p>Trois façons simples de commander tes boissons préférées</p>

      <article class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <OrderTyperCard></OrderTyperCard>
        <OrderTyperCard></OrderTyperCard>
        <OrderTyperCard></OrderTyperCard>
      </article>


    </section>
  </main>


</template>
<script setup lang="ts">
import HowItWorkCard from '@/components/allococa/card/howItWorkCard.vue';
import OrderTyperCard from '@/components/allococa/card/orderTyperCard.vue';
import WhySelectAllococaCard from '@/components/allococa/card/whySelectAllococaCard.vue';
import HomeTabs from '@/components/allococa/homeTabs.vue';
import TextLinkWithArrow from '@/components/allococa/textLinkWithArrow.vue';
import NavBar from '@/components/aside/navBar.vue';
import CommonButton from '@/components/buttons/commonButton.vue';
import CustomButton from '@/components/buttons/customButton.vue';
import CommonTabs from '@/components/common/commonTabs.vue';
import Button from '@/components/ui/button/Button.vue';
import { ArrowRight, ShoppingBasket } from 'lucide-vue-next';

</script>
