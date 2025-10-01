<template>
    <div class="bg-[#F6F6F6] rounded-lg p-6 flex flex-col justify-between">
        <!-- En-tête avec titre et date -->
        <div class="flex items-center justify-between mb-4 ml-5">
            <h3 class="text-lg font-semibold text-gray-800">
                Commande du {{ formatOrderDate(order.order_date) }}
            </h3>
        </div>

        <!-- Items de la commande -->
        <div class="space-y-2 mb-4 ml-5">
            <!-- Casier -->
            <div v-if="casiersRecap" class="flex items-start space-x-2">
                <div class="flex items-center">
                    <span class="text-sm font-semibold">Casier</span>
                    <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ casiersRecap }}</span>
                </div>
            </div>

            <!-- Packs -->
            <div v-if="packsRecap" class="flex items-start space-x-2">
                <div class="flex items-center">
                    <span class="text-sm font-semibold">Packs</span>
                    <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ packsRecap }}</span>
                </div>
            </div>
        </div>

        <!-- Total -->
        <div class="mb-4">
            <div class="font-medium text-gray-800">
                Total
            </div>
            <div class="font-bold text-gray-900">
                {{ formatPrice(order.total_amount) }}
            </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button @click="$emit('reorder')"
                class="sm:flex-1 bg-primary-50 hover:bg-primary-40 rounded-3xl text-white px-4 py-2 text-sm font-medium transition-colors">
                Recommander
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { OrderResponse } from '@/services/locker-products/order-type'
import { formatPrice } from '@/shared/shared'
import { computed, type PropType } from 'vue'

const props = defineProps({
    order: {
        type: Object as PropType<OrderResponse>,
        required: true
    }
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
        year: 'numeric'
    })
}

// Récapitulatif des casiers
const casiersRecap = computed(() => {
    const casiers = props.order.items.filter(
        (item) => item.items_details.mode === 'locker' || item.items_details.mode === 'full-locker'
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
                name: item.variant.product.name,
                quantity: totalQuantity
            }
        }
    })

    const items = Object.values(productQuantities).map(
        ({ quantity, name }) => `${quantity}x ${name}`
    )

    return items.join(', ')
})

// Récapitulatif des packs
const packsRecap = computed(() => {
    const packs = props.order.items.filter(
        (item) => item.items_details.mode === 'water'
    )

    if (packs.length === 0) return null

    const productQuantities: Record<string, { name: string; quantity: number }> = {}

    packs.forEach((item) => {
        const productId = item.variant.product.id
        const totalQuantity = item.quantity

        if (productQuantities[productId]) {
            productQuantities[productId].quantity += totalQuantity
        } else {
            productQuantities[productId] = {
                name: item.variant.product.name,
                quantity: totalQuantity
            }
        }
    })

    const items = Object.values(productQuantities).map(
        ({ quantity, name }) => `${quantity}x ${name}`
    )

    return items.join(', ')
})
</script>