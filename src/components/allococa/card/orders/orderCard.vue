<template>
    <div class="bg-white rounded-lg shadow-md p-6 mb-4">
        <!-- En-tête avec titre et date -->
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800">
                {{ order.title }}
            </h3>
        </div>

        <!-- Items de la commande -->
        <div class="space-y-2 mb-4">
            <!-- Casier -->
            <div v-if="order.casier" class="flex items-start space-x-2">
                <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                    <span class="text-sm font-medium text-gray-700">Casier</span>
                    <span class="text-sm text-gray-600 ml-1">{{ order.casier }}</span>
                </div>
            </div>

            <!-- Packs -->
            <div v-if="order.packs" class="flex items-start space-x-2">
                <div class="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                    <span class="text-sm font-medium text-gray-700">Packs</span>
                    <span class="text-sm text-gray-600 ml-1">{{ order.packs }}</span>
                </div>
            </div>
        </div>

        <!-- Total -->
        <div class="mb-4">
            <div class=" font-bold text-gray-800">
                Total
            </div>
            <div class=" font-bold text-gray-900">
                {{ order.total }} FCFA
            </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex space-x-3">
            <button @click="$emit('reorder')"
                class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Recommander
            </button>
            <button @click="$emit('modify')"
                class="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 transition-colors">
                Modifier
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface Order {
    title: string
    casier?: string
    packs?: string
    total: number
}



defineProps({
    order: {
        type: Object as PropType<Order>,
        required: true
    }
})

interface Emits {
    reorder: []
    modify: []
}

defineEmits<Emits>()
</script>