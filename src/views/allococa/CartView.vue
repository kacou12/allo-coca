<template>
  <div class="maxContain3xl py-8 min-h-[calc(100vh-80px)]">
    <h1 class="text-xl font-bold mb-6">Mon panier</h1>

    <form @submit.prevent="onSubmit">
      <section v-if="cartQuantityLength > 0" class="flex flex-col lg:flex-row gap-8">
        <!-- Résumé de commande -->
        <div class="lg:w-[360px] shrink-0 lg:order-last">
          <div class="border rounded-xl p-5 space-y-3">
            <h2 class="text-sm font-bold">Résumé de ma commande</h2>

            <div class="flex justify-between items-center text-sm">
              <span>Sous-total</span>
              <span class="font-semibold">{{ subtotal }} FCFA</span>
            </div>

            <div class="flex justify-between items-center text-sm border-t pt-2 border-gray-300">
              <span>Consignation</span>
              <span class="font-semibold">{{ amountConsignation }} FCFA</span>
            </div>

            <article>
              <div class="flex items-center justify-between space-x-2 text-sm">
                <section class="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="consignation-checkbox"
                    v-model="has_own_lockers"
                    class="form-checkbox h-4 w-4 text-primary-50 rounded"
                  />
                  <label for="consignation-checkbox" class="text-gray-700 text-xs">
                    Je possède déjà mes casiers (retirer la consigne)
                  </label>
                </section>
                <section v-if="has_own_lockers">
                  <InputNumberField
                    id="locker-count"
                    name="lockerCount"
                    type="number"
                    v-model="count_has_own_lockers"
                    :min="0"
                    :max="casierQuantityLength"
                    class="p-2 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </section>
              </div>
              <div class="min-h-[24px]" v-if="!!errors.lockerCount">
                <FadeInAnimation mode="out-in">
                  <small class="app-form-item-error text-error-500 text-xs font-worksans font-normal">
                    Veuillez sélectionner le nombre de casiers que vous souhaitez consigner.
                  </small>
                </FadeInAnimation>
              </div>
            </article>

            <div class="flex justify-between items-center text-sm border-t pt-2 border-gray-300">
              <span>Livraison</span>
              <span class="font-semibold">0 FCFA</span>
            </div>

            <div class="flex justify-between items-center text-sm font-bold pt-2 border-t border-gray-300">
              <span>Total</span>
              <span class="text-primary-50">{{ total }} FCFA</span>
            </div>

            <p class="text-xs text-primary-60">
              Le montant minimum pour une commande est de
              <span class="font-bold">10000 FCFA</span>
            </p>

            <Button
              type="submit"
              :disabled="!!errors.lockerCount || total < 10000"
              class="w-full py-1 text-sm rounded-[90px] bg-primary-50 hover:bg-primary-60"
            >
              Finaliser ma commande
            </Button>
          </div>
        </div>

        <!-- Liste des articles -->
        <div class="flex-1 space-y-4">
          <CartLineCard
            v-for="cartLine in cart"
            :key="cartLine.id"
            :cartLine="cartLine"
            :type="cartLine.type"
          />
        </div>
      </section>

      <section v-else class="flex flex-col items-center justify-center py-20">
        <img src="@/assets/allococa/empty-cart.gif" alt="Panier vide" />
        <p class="text-sm text-[#888888] mt-2">Votre panier est vide</p>
      </section>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { uniqBy } from 'lodash'

import { AppRoute } from '@/constants/app-route'
import { useCart } from '@/composables/queries/useCart'
import { Button } from '@/components/ui/button'
import CartLineCard from '@/components/allococa/cart/cartLineCard.vue'
import FadeInAnimation from '@/components/animations/fadeInAnimation.vue'
import InputNumberField from '@/components/vee-validate/InputNumberField.vue'
import type { ProductResponse } from '@/services/locker-products/locker-products-type'

const router = useRouter()

const {
  cartQuantityLength,
  cart,
  casierQuantityLength,
  has_own_lockers,
  count_has_own_lockers,
  amountConsignation,
} = storeToRefs(useCart())

const cartSchema = z
  .object({
    lockerCount: z.number().min(1, 'min 1 locker').optional(),
  })
  .refine(
    (data) => {
      if (has_own_lockers.value) {
        return data.lockerCount && data.lockerCount >= 1
      }
      return true
    },
    {
      message: 'Veuillez sélectionner le nombre de casiers que vous souhaitez consigner.',
      path: ['lockerCount'],
    },
  )

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(cartSchema),
})

const onSubmit = handleSubmit(() => {
  router.push({ name: AppRoute.DELIVERY_INITIALISATON.name })
})

const deliveryFee = ref(0)

const productsDataGrouped = (
  products: ProductResponse[],
  type: 'locker' | 'fullLocker' | 'water',
) => {
  const groupedMap = new Map<string, ProductResponse>()
  let setProducts = type === 'locker' ? uniqBy(products, 'id') : products

  setProducts.forEach((product) => {
    const existing = groupedMap.get(product.id)
    if (existing) {
      existing.quantity += product.quantity
    } else {
      groupedMap.set(product.id, { ...product })
    }
  })

  return Array.from(groupedMap.values())
}

const subtotal = computed(() =>
  cart.value.reduce((total, cartLine) => {
    const groupedProducts = productsDataGrouped(cartLine.products, cartLine.type)
    return (
      total +
      groupedProducts.reduce((acc, product) => acc + product.unit_price * product.quantity, 0) *
        cartLine.quantity
    )
  }, 0),
)

const total = computed(() => subtotal.value + deliveryFee.value + amountConsignation.value)
</script>
