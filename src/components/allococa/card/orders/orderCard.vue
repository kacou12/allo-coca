<template>
    <div class="bg-[#F6F6F6] rounded-lg  p-6  flex flex-col justify-between">
        <!-- En-tête avec titre et date -->
        <div class="flex items-center justify-between mb-4 ml-5">
            <h3 class="text-lg font-semibold text-gray-800">
                {{ order.title }}
            </h3>
        </div>

        <!-- Items de la commande -->
        <div class="space-y-2 mb-4 ml-5">
            <!-- Casier -->
            <div v-if="order.casier" class="flex items-start space-x-2">
                <!-- <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div> -->
                <div class="flex items-center">
                    <span class="text-sm font-semibold ">Casier</span>
                    <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ order.casier }}</span>
                </div>
            </div>

            <!-- Packs -->
            <div v-if="order.packs" class="flex items-start space-x-2">
                <!-- <div class="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div> -->
                <div class="flex items-center">
                    <span class="text-sm font-semibold ">Packs</span>
                    <span class="text-sm text-gray-600 ml-1 line-clamp-3">{{ order.packs }}</span>
                </div>
            </div>
        </div>

        <!-- Total -->
        <div class="mb-4">
            <div class=" font-medium text-gray-800">
                Total
            </div>
            <div class=" font-bold text-gray-900">
                {{ order.total }} FCFA
            </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex space-x-3">
            <button @click="$emit('reorder')"
                class="flex-1 bg-primary-50 hover:bg-primary-40 rounded-3xl text-white px-4 py-2  text-sm font-medium transition-colors">
                Recommander
            </button>
            <button @click="$emit('modify')"
                class="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2  rounded-3xl text-sm font-medium border  transition-colors border-black">
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