<template>
  <div class="bg-black py-[50px]">
    <div class="maxContain3xl">
      <article class="flex flex-col lg:flex-row lg:justify-between lg: items-start mb-16">
        <section class="space-y-8">
          <RouterLink to="/">
            <img src="/src/assets/allococa/logo-allo-coca.png" alt="Logo" />
          </RouterLink>
          <div class="2xl:w-[50%]">
            <p class="text-white">
              AlloCoca.ci - Ton service préféré de livraison de boissons à Abidjan. Vous avez soif ?
              Cliquez, on arrive
            </p>
          </div>

          <div class="flex items-center gap-4">
            <a
              href="https://www.tiktok.com/@allo.coca?_t=ZM-8zwYVW0W8PT&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_12539_12111)">
                  <path
                    d="M17.0725 -0.00878906H13.0278V16.339C13.0278 18.2869 11.4722 19.8869 9.53626 19.8869C7.60034 19.8869 6.04469 18.2869 6.04469 16.339C6.04469 14.426 7.56577 12.8607 9.43257 12.7912V8.68688C5.31872 8.75641 2 12.1303 2 16.339C2 20.5825 5.38786 23.9912 9.57085 23.9912C13.7538 23.9912 17.1416 20.5477 17.1416 16.339V7.95641C18.6627 9.06948 20.5295 9.73034 22.5 9.76514V5.66078C19.4579 5.55643 17.0725 3.05208 17.0725 -0.00878906Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12539_12111">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 -0.00878906)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>

            <a
              href="https://www.facebook.com/cocacolaofficiel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_12539_12113)">
                  <path
                    d="M24 11.9912C24 5.36379 18.6274 -0.00878906 12 -0.00878906C5.37258 -0.00878906 0 5.36379 0 11.9912C0 17.9807 4.3882 22.9452 10.125 23.8454V15.46H7.07812V11.9912H10.125V9.34746C10.125 6.33996 11.9166 4.67871 14.6576 4.67871C15.9701 4.67871 17.3438 4.91309 17.3438 4.91309V7.86621H15.8306C14.34 7.86621 13.875 8.79129 13.875 9.74121V11.9912H17.2031L16.6711 15.46H13.875V23.8454C19.6118 22.9452 24 17.9807 24 11.9912Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12539_12113">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 -0.00878906)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </section>
        <section class="flex flex-col sm:flex-row sm:items-center gap-14 mt-10 lg:mt-0">
          <div class="space-y-2">
            <p class="text-[14px] font-opensans text-white text-opacity-60">Liens rapides</p>
            <article class="space-y-2 text-white">
              <a
                class="hover:underline"
                href="#"
                @click.prevent="routeAndScrollTo('comment-ca-marche')"
              >
                Comment ça marche
              </a>
              <div>
                <a
                  class="hover:underline"
                  href="#"
                  @click.prevent="$router.push({ name: AppRoute.PRODUCTS.name })"
                >
                  Commander
                </a>
              </div>

              <p>0585445252</p>
            </article>
          </div>
          <div class="space-y-2">
            <p class="text-[14px] font-opensans text-white text-opacity-60">Légal</p>
            <article class="space-y-2 text-white">
              <p>Mentions légales</p>
              <p>Politique de confidentialité</p>
              <p>CGV</p>
            </article>
          </div>
        </section>
      </article>
      <article
        class="pt-8 mt-8 space-y-3 border-t-[1px] border-t-white/10 flex flex-col sm:flex-row items-center justify-between text-white"
      >
        <p>&copy; 2025 AlloCoca.ci - Tous droits réservés</p>
        <!-- <p>Website BY THEDESIGNHERO</p> -->
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppRoute } from '@/constants/app-route'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const windowScrollY = ref(0)

const isScrolledOrHomePage = computed(
  () =>
    (router.currentRoute.value.name == AppRoute.HOME_REDIRECT.name && windowScrollY.value > 0) ||
    router.currentRoute.value.name != AppRoute.HOME_REDIRECT.name,
)

const router = useRouter()

const route = useRoute()

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  } else {
    console.error(`Element with id "${id}" not found.`)
  }
}

const routeAndScrollTo = (id: string) => {
  if (route.name !== AppRoute.HOME_REDIRECT.name) {
    router.push({ name: AppRoute.HOME_REDIRECT.name, hash: `#${id}` })
  } else {
    scrollTo(id)
  }
}
</script>

<style scoped></style>
