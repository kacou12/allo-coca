<template>
  <NavBar></NavBar>
  <div class=" h-screen w-full bg-[#FCFCFC]  pt-[110px]   maxContain3xl">

    <section class="mx-auto max-w-[450px] space-y-4">

      <h1 class="text-clamp-md font-tcc font-bold  text-center">Créer un compte</h1>
      <p class="text-neutral-20   text-center">
        Remplissez les informations ci-dessous pour finaliser votre commande.
      </p>


      <RegisterForm class="">

      </RegisterForm>

      <div class="text-center flex items-center justify-center gap-1">
        <p class="text-[#4F4F4F] text-xs">Pas encore de compte ?</p>
        <RouterLink :to="{ name: AppRoute.LOST_PASSWORD.name }"
          class=" text-xs cursor-pointer font-medium hover:underline ">
          Rejoigner la famille
        </RouterLink>
      </div>
    </section>



  </div>
</template>
<script setup lang="ts">
import RegisterForm from '@/components/allococa/forms/registerForm.vue';
import NavBar from '@/components/aside/navBar.vue';
import LoginForm from '@/components/forms/loginForm.vue';
import LoginCaroussel from '@/components/modals/loginCaroussel.vue';
import { AppRoute } from '@/constants/app-route';



const appicons = new URL("/src/assets/images/logos-paytic/paytic-logo.png", import.meta.url).href;


</script>

<style scoped>
/* Styles personnalisés */
</style>
