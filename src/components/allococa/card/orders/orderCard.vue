<template>
  <div class="bg-[#F6F6F6] rounded-lg p-6 flex flex-col justify-between">
    <!-- En-tête avec titre et date -->
    <div class="flex items-center justify-between mb-4 space-x-2">
      <h3 class="text-lg font-semibold text-gray-800">Commande : {{ order.reference }}</h3>
      <OrderStatusBloc :order="order"></OrderStatusBloc>
    </div>

    <!-- Items de la commande -->
    <div class="space-y-2 mb-4 w-full">
      <div class="flex items-start space-x-2 w-full">
        <div class="flex items-center justify-between w-full">
          <span class="text-sm font-semibold">Date : </span>
          <span class="text-sm text-gray-600 ml-1">{{
            formatRelativeDate(new Date(order.delivery.created_at))
          }}</span>
        </div>
      </div>

      <!-- Casier -->
      <div v-if="casiersRecap" class="flex items-start space-x-2">
        <div class="flex justify-between w-full space-x-[5px]">
          <span class="text-sm font-semibold">Casier(s): </span>
          <div class="flex-1">
            <p class="text-sm text-gray-600 ml-1">
              {{ casiersRecap }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="order.is_settled" class="flex items-start space-x-2 w-full">
        <div class="flex items-center w-full justify-between">
          <span class="text-sm font-semibold">Casier(s) consigné(s) : </span>
          <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ order.number_of_casier }}</span>
        </div>
      </div>

      <!-- Packs -->
      <div v-if="packsRecap" class="flex items-start space-x-2 w-full">
        <div class="flex items-center w-full justify-between">
          <span class="text-sm font-semibold">Pack(s) : </span>
          <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ packsRecap }}</span>
        </div>
      </div>
    </div>

    <!-- Total -->
    <div class="mb-4 flex items-center justify-between">
      <div class="font-medium text-gray-800">Total :</div>
      <div class="font-bold text-gray-900">
        {{ formatPrice(order.total_amount) }}
      </div>
    </div>

    <!-- Boutons d'action -->
    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
      <!-- <button @click="$emit('reorder')"
                class="sm:flex-1 bg-primary-50 hover:bg-primary-40 rounded-3xl text-white px-4 py-2 text-sm font-medium transition-colors">
                Recommander
            </button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderResponse } from '@/services/locker-products/order-type'
import { formatPrice, formatRelativeDate, toLowercaseFirstLetterOfEachWord } from '@/shared/shared'
import { computed, type PropType } from 'vue'
import OrderStatusBloc from './orderStatusBloc.vue'

const props = defineProps({
  order: {
    type: Object as PropType<OrderResponse>,
    required: true,
  },
})

interface Emits {
  reorder: []
  modify: []
}

defineEmits<Emits>()

// Formater la date de commande
const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Récapitulatif des casiers
const casiersRecap = computed(() => {
  const casiers = props.order.items.filter(
    (item) => item.type === 'locker' || item.type === 'fullLocker',
  )

  if (casiers.length === 0) return null

  const productQuantities: Record<string, { name: string; quantity: number }> = {}

  casiers.forEach((item) => {
    const productId = item.variant.product.id
    const totalQuantity = item.quantity

    if (productQuantities[productId]) {
      productQuantities[productId].quantity += totalQuantity
    } else {
      productQuantities[productId] = {
        name: `${item.variant.product.name} ${toLowercaseFirstLetterOfEachWord(item.variant.label)} ( ${item.variant.size} , ${item.variant.description} )`,
        quantity: totalQuantity,
      }
    }
  })

  const items = Object.values(productQuantities).map(
    ({ quantity, name }) => `${quantity} x ${name}`,
  )

  return items.join(', ')
})

// Récapitulatif des packs
const packsRecap = computed(() => {
  const packs = props.order.items.filter((item) => item.type === 'water')

  if (packs.length === 0) return null

  const productQuantities: Record<string, { name: string; quantity: number }> = {}

  packs.forEach((item) => {
    const productId = item.variant.product.id
    const totalQuantity = item.quantity

    if (productQuantities[productId]) {
      productQuantities[productId].quantity += totalQuantity
    } else {
      productQuantities[productId] = {
        name: `${item.variant.product.name} ${item.variant.label}`,
        quantity: totalQuantity,
      }
    }
  })

  const items = Object.values(productQuantities).map(({ quantity, name }) => `${quantity}x ${name}`)

  return items.join(', ')
})
</script>
