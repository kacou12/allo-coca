<template>
  <div class="bg-[#FCFCFC] h-screen w-full  ">
    <NavBar></NavBar>
    <div class="  pt-[110px]   maxContain3xl">

      <section class="mx-auto max-w-[450px] space-y-4 mt-[50px]">

        <h1 class="text-clamp-md font-tcc font-bold  text-center">Connexion à votre espace</h1>
        <p class="text-neutral-20   text-center">
          Accédez à votre espace pour finaliser votre commande
          ou consulter vos précédents casiers.
        </p>


        <LoginForm class="">

        </LoginForm>

        <div class="text-center flex items-center justify-center gap-1">
          <p class="text-[#4F4F4F] text-xs">Pas encore de compte ?</p>
          <RouterLink :to="{ name: AppRoute.REGISTER.name }"
            class=" text-xs cursor-pointer font-medium hover:underline ">
            Rejoigner la famille
          </RouterLink>
        </div>
      </section>



    </div>

  </div>
</template>
<script setup lang="ts">
import NavBar from '@/components/aside/navBar.vue';
import LoginForm from '@/components/forms/loginForm.vue';
import LoginCaroussel from '@/components/modals/loginCaroussel.vue';
import { AppRoute } from '@/constants/app-route';



const appicons = new URL("/src/assets/images/logos-paytic/paytic-logo.png", import.meta.url).href;


</script>

<style scoped>
/* Styles personnalisés */
</style>
