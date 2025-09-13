<template>
  <!-- banner section -->
  <section
    class="h-screen relative p-5 bg-[url(/src/assets/allococa/banner/banner-1.jpg)] bg-cover bg-center bg-no-repeat">
    <article class="absolute right-0 left-0 bottom-0   w-full h-1/2 ">
      <div class="w-full h-full relative  maxContain3xl">
        <div class=" xl:w-[50%] 2xl:w-[40%] absolute bottom-[60px]  space-y-8">
          <h1 class="text-clamp-h1-lg font-bold font-tcc text-white leading-[70px]">Ton casier <br></br> Coca livré chez
            toi,
            sans bouger.
          </h1>
          <CustomButton type="default" class="text-white hover:bg-primary-50 ">
            <span>Je commence ma commande</span>
            <ShoppingBasket></ShoppingBasket>
          </CustomButton>
        </div>
      </div>
    </article>
  </section>

  <main class="maxContain3xl py-5">
    <!-- Nos produits disponibles -->
    <section>
      <article class="flex items-start justify-between my-10">
        <!-- <h3 class="text-clamp-lg">Nos produits disponibles</h3> -->
        <div class="w-1/2">

          <h3 class="text-clamp-lg font-bold font-tcc">Nos produits disponibles</h3>
        </div>

        <div class="space-y-3 w-1/2 border pl-40">

          <p>Compose ton casier comme tu veux ou choisis directement un pack prêt à livrer. Des bouteilles
            fraîches, des
            prix fixes, et la livraison offerte chez toi en 24h !</p>

          <!-- <div class="flex items-center gap-[5px]">

            <Button variant="link" class="text-black  p-0">Configurer mon casier</Button>
            <div class="">
              <ArrowRight :size="16"></ArrowRight>
            </div>
          </div> -->
          <TextLinkWithArrow text="Configurer mon casier"></TextLinkWithArrow>
        </div>

      </article>

      <HomeTabs></HomeTabs>

    </section>

    <!-- Vos type de commande -->
    <section class="text-center space-y-8 my-20">
      <h3 class="text-clamp-lg font-bold font-tcc ">Vos type de commande</h3>
      <p>Trois façons simples de commander tes boissons préférées</p>

      <article class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:mx-10">
        <OrderTyperCard></OrderTyperCard>
        <OrderTyperCard></OrderTyperCard>
        <OrderTyperCard></OrderTyperCard>
      </article>


    </section>
  </main>

  <!-- Pas besoin de créer un compte ! -->
  <section class="bg-black">
    <div class="maxContain3xl flex items-center justify-center gap-24 py-16">
      <div class="space-y-4 max-w-[385px]">
        <article class="space-y-4">
          <h3 class="text-clamp-lg  leading-[40px] font-bold font-tcc text-white">Pas besoin de créer un compte !</h3>
          <p class="text-white/70 text-sm">Pas envie de perdre du temps ? Commence ta commande en 1 clic, on
            prendra tes
            infos
            plus tard.</p>
        </article>
        <article class="space-y-8">
          <TextLinkWithArrow color="text-white" text="Commence sans Compte"></TextLinkWithArrow>
          <TextLinkWithArrow color="text-white" text="Retrouvez une commande"></TextLinkWithArrow>
        </article>
      </div>

      <div>
        <img src="/src/assets/allococa/home/section-no-account-need.png" alt="">
      </div>

    </div>
  </section>

  <!-- Comment ça marche ? -->
  <section class="space-y-10 my-28">
    <div class="space-y-3 text-center ">

      <h3 class="text-clamp-lg  leading-[40px] font-bold font-tcc ">Comment ça marche ?</h3>

      <p class="text-black">Trois étapes simples pour recevoir tes boissons</p>
    </div>

    <article class="flex items-center gap-3  justify-center">
      <HowItWorkCard></HowItWorkCard>
      <img src="/src/assets/allococa/home/comment-ca-marche/direction.png" alt="">
      <HowItWorkCard></HowItWorkCard>
      <img src="/src/assets/allococa/home/comment-ca-marche/direction.png" alt="">
      <HowItWorkCard></HowItWorkCard>

    </article>

  </section>

  <!-- Pourquoi choisir AlloCoca ? -->
  <section class="bg-black relative py-28 overflow-hidden">
    <div class="absolute right-0 bottom-[20%]">
      <img src="/src/assets/allococa/home/section-pourquoi-choisir-allococa/sun-red.png" alt=""></img>
    </div>
    <article class="maxContain3xl  xl:max-w-[850px] space-y-14">
      <div class="text-center space-y-3 ">

        <h3 class="text-clamp-lg  leading-[40px] font-bold font-tcc text-white ">Pourquoi choisir AlloCoca ?</h3>
        <p class="text-white">Trois étapes simples pour recevoir tes boissons</p>
      </div>
      <div class="grid grid-cols-1  lg:grid-cols-2 gap-3">
        <WhySelectAllococaCard></WhySelectAllococaCard>
        <WhySelectAllococaCard></WhySelectAllococaCard>
        <WhySelectAllococaCard></WhySelectAllococaCard>
        <WhySelectAllococaCard></WhySelectAllococaCard>
        <div class="col-span-2 rounded-xl py-[26px] bg-white text-center space-y-5">
          <div class=" text-center">
            <h4 class="text-clamp-sm  leading-[40px] font-bold font-tcc">Prêt à passer ta première commande ?
            </h4>
            <p>Rejoins des milliers de clients satisfaits à Abidjan</p>

          </div>
          <div class="flex justify-center items-center gap-4 ">
            <div>
              <CommonButton type="default" title="Commander maintenant"></CommonButton>
            </div>
            <div>
              <CommonButton type="outline" title="Contacter via Whatsapp"></CommonButton>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>



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
