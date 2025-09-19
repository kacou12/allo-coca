<template>
  <!-- banner carousel section -->
  <HomeCarousel></HomeCarousel>


  <main class="maxContain3xl py-5">
    <!-- Nos produits disponibles -->
    <section>
      <article class="flex flex-col lg:flex-row lg:items-start lg:justify-between my-10 space-y-5 lg:space-y-0">
        <!-- <h3 class="text-clamp-lg">Nos produits disponibles</h3> -->
        <div class="lg:w-1/2">

          <h3 class="text-clamp-lg font-bold font-tcc">Nos produits disponibles</h3>
        </div>

        <div class="space-y-3 lg:w-1/2  lg:pl-40">

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
      <div class="xl:mx-10">

        <OrderTypeCarousel></OrderTypeCarousel>
      </div>


    </section>
  </main>

  <!-- Pas besoin de créer un compte ! -->
  <section class="bg-black">
    <div class="maxContain3xl flex items-center justify-center gap-24 py-16">
      <div class="space-y-4 md:max-w-[385px]">
        <article class="space-y-4">
          <h3 class="text-clamp-lg  leading-[40px] font-bold font-tcc text-white">Pas besoin de créer un compte !</h3>
          <p class="text-white/70 text-sm">Pas envie de perdre du temps ? Commence ta commande en 1 clic, on
            prendra tes
            infos
            plus tard.</p>
        </article>
        <article class="space-y-8">
          <TextLinkWithArrow @click="$router.push({ name: AppRoute.PRODUCTS.name })" color="text-white"
            text="Commence sans Compte"></TextLinkWithArrow>
          <TextLinkWithArrow @click="$router.push({ name: AppRoute.ORDERS.name })" color="text-white"
            text="Retrouvez une commande"></TextLinkWithArrow>
        </article>
      </div>

      <div class="hidden md:block">
        <img src="/src/assets/allococa/home/section-no-account-need.png" alt="">
      </div>

    </div>
  </section>

  <!-- Comment ça marche ? -->
  <section class="space-y-10 py-28" id="comment-ca-marche">
    <div class="space-y-3 text-center ">

      <h3 class="text-clamp-lg  leading-[40px] font-bold font-tcc ">Comment ça marche ?</h3>

      <p class="text-black">Trois étapes simples pour recevoir tes boissons</p>
    </div>

    <article class="flex items-center  flex-wrap lg:flex-nowrap gap-3 justify-center mx-5 xl:mx-0">
      <HowItWorkCard :data="{
        image: 'shopping-cart.png',
        title: '1. Choisis tes boissons',
        description: 'Choisis tes boissons en ligne ou par WhatsApp en quelques clics',
      }"></HowItWorkCard>
      <img class="hidden lg:block" src="/src/assets/allococa/home/comment-ca-marche/direction.png" alt="">
      <HowItWorkCard :data="{
        image: 'zap.png',
        title: '2. Je reçois sous 24h',
        description: 'Livraison gratuite à ton domicilepartout à Abidjan',
      }"></HowItWorkCard>
      <img class="hidden lg:block" src="/src/assets/allococa/home/comment-ca-marche/direction.png" alt="">
      <HowItWorkCard :data="{
        image: 'refresh.png',
        title: '3. Je recharge mon casier',
        description: 'Garde ton casier et recommande facilement quand tu veuxs',
      }"></HowItWorkCard>

    </article>

  </section>

  <!-- Pourquoi choisir AlloCoca ? -->
  <section class="bg-black relative py-28 overflow-hidden">
    <div class="z-0 absolute right-0 bottom-[20%] hidden xl:block">
      <img src="/src/assets/allococa/home/section-pourquoi-choisir-allococa/sun-red.png" alt=""></img>
    </div>
    <article class="z-50 maxContain3xl  xl:max-w-[850px] space-y-14">
      <div class="text-center space-y-3 ">

        <h3 class="text-clamp-lg  leading-[40px] font-bold font-tcc text-white ">Pourquoi choisir AlloCoca ?</h3>
        <p class="text-white">Trois étapes simples pour recevoir tes boissons</p>
      </div>
      <div class="flex flex-col lg:grid grid-cols-1  lg:grid-cols-2 gap-3">
        <WhySelectAllococaCard icon="bus.png" title="Livraison gratuite à Abidjan"
          description="Aucun frais de livraison, où que tu sois dans la capitale" />

        <WhySelectAllococaCard icon="shield.png" title="Paiement simple et sécurisé"
          description="Mobile Money accepté, transactions 100% sécurisées" />

        <WhySelectAllococaCard icon="rotate.png" title="Casiers consignés, rechargeables"
          description="Système écologique, tu paies la consigne une seule fois" />

        <WhySelectAllococaCard icon="message.png" title="Assistance WhatsApp en 1 clic"
          description="Une question ? Notre équipe répond instantanément" />
        <div class="col-span-2 rounded-xl py-[26px] bg-white text-center space-y-5">
          <div class=" text-center">
            <h4 class="text-clamp-sm  leading-[40px] font-bold font-tcc">Prêt à passer ta première commande ?
            </h4>
            <p>Rejoins des milliers de clients satisfaits à Abidjan</p>

          </div>
          <div class="flex md:justify-center md:items-center flex-col md:flex-row gap-4 ">
            <div>
              <CommonButton @click="$router.push({ name: AppRoute.PRODUCTS.name })" type="default"
                title="Commander maintenant"></CommonButton>
            </div>
            <div>
              <CommonButton type="outline" title="Contacter via Whatsapp"></CommonButton>
            </div>
          </div>
        </div>
      </div>
    </article>

  </section>

  <!-- Ce qu'en disent nos clients -->
  <section class="maxContain3xl space-y-10 my-28">
    <div class="flex flex-col sm:flex-row items-center justify-between  my-16">
      <h3 class="text-clamp-lg  leading-[40px] font-bold font-tcc ">Ce qu'en disent nos clients</h3>
      <div>
        <CommonButton @click="$router.push({ name: AppRoute.PRODUCTS.name })" type="default"
          title="Je passe ma commande"></CommonButton>
      </div>
    </div>


    <ReviewCaro usel></ReviewCaro>


  </section>



</template>
<script setup lang="ts">
import BeverageCard from '@/components/allococa/card/beverageCard.vue';
import CommonCocaTabs from '@/components/allococa/card/commonCocaTabs.vue';
import HowItWorkCard from '@/components/allococa/card/howItWorkCard.vue';
import OrderTyperCard from '@/components/allococa/card/orderTyperCard.vue';
import ReviewCard from '@/components/allococa/card/reviewCard.vue';
import WaterCard from '@/components/allococa/card/waterCard.vue';
import WhySelectAllococaCard from '@/components/allococa/card/whySelectAllococaCard.vue';
import HomeCarousel from '@/components/allococa/homeCarousel.vue';
import HomeTabs from '@/components/allococa/homeTabs.vue';
import OrderTypeCarousel from '@/components/allococa/orderTypeCarousel.vue';
import ReviewCarousel from '@/components/allococa/ReviewCarousel.vue';
import TextLinkWithArrow from '@/components/allococa/textLinkWithArrow.vue';
import NavBar from '@/components/aside/navBar.vue';
import CommonButton from '@/components/buttons/commonButton.vue';
import CustomButton from '@/components/buttons/customButton.vue';
import CommonTabs from '@/components/common/commonTabs.vue';
import Button from '@/components/ui/button/Button.vue';
import { AppRoute } from '@/constants/app-route';
import { ArrowRight, ShoppingBasket } from 'lucide-vue-next';

</script>
