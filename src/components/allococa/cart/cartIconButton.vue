<template>
  <section
    :class="[isScrolled ? 'bg-primary-50 border-primary-50' : 'border-white']"
    class="relative rounded-full border-[1px] p-2 border-white flex items-center justify-center cursor-pointer w-fit"
    @click="router.push({ name: AppRoute.CART.name })"
  >
    <article>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_13510_633)">
          <path
            d="M1.7085 1.70831H3.37516L5.59183 12.0583C5.67314 12.4374 5.88405 12.7762 6.18826 13.0165C6.49246 13.2568 6.87092 13.3836 7.2585 13.375H15.4085C15.7878 13.3744 16.1556 13.2444 16.451 13.0065C16.7465 12.7686 16.9519 12.4371 17.0335 12.0666L18.4085 5.87498H4.26683M7.50016 17.5C7.50016 17.9602 7.12707 18.3333 6.66683 18.3333C6.20659 18.3333 5.8335 17.9602 5.8335 17.5C5.8335 17.0397 6.20659 16.6666 6.66683 16.6666C7.12707 16.6666 7.50016 17.0397 7.50016 17.5ZM16.6668 17.5C16.6668 17.9602 16.2937 18.3333 15.8335 18.3333C15.3733 18.3333 15.0002 17.9602 15.0002 17.5C15.0002 17.0397 15.3733 16.6666 15.8335 16.6666C16.2937 16.6666 16.6668 17.0397 16.6668 17.5Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_13510_633">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div
        v-if="cartQuantityLength > 0"
        class="absolute text-[10px] inline-flex items-center justify-center w-6 h-6 font-bold text-primary-50 bg-white border-[1px] border-primary-50 rounded-full -top-2 -end-2 dark:border-gray-900"
      >
        {{ cartQuantityLength }}
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { AppRoute } from '@/constants/app-route'
import { useCart } from '@/composables/queries/useCart'

defineProps({
  isScrolled: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const { cartQuantityLength } = storeToRefs(useCart())
</script>
