<template>
    <div class="p-4 space-y-1 bg-[#F6F6F6] rounded-xl">
        <section class="h-[268px] flex items-center justify-center">
            <img :src="product.image_url" :alt="product.product.name" class="w-[69px] h-[220px]" />
        </section>
        <section class="space-y-1">
            <p class="text-[10px] text-[#888888]">{{ product.product.description }}</p>
            <p class="font-medium text-lg">{{ product.product.name }}</p>
            <div class="divide-x-[1px] divide-[#D1D1D1] space-x-2 mt-1 flex items-center gap-2">
                <p class="text-sm text-[#888888]">{{ product.label }}</p>
                <p class="text-sm pl-2">{{ formatPrice(product.unit_price) }}</p>
            </div>
            <div class="flex items-center justify-between">
                <Button class="rounded-[90px] h-8 border-black" variant="outline" @click="handleAddToCart">
                    <div class="flex items-center gap-1">
                        <ShoppingBasket :size="16" />
                        <span class="text-xs font-medium">Casier</span>
                    </div>
                </Button>

                <Button @click="handleViewDetails" class="border-black" variant="ghost">
                    <div class="border-black border-[1px] bg-white p-2 rounded-full">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16675 9.99105H15.8334M15.8334 9.99105L10.0001 4.15771M15.8334 9.99105L10.0001 15.8244"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </Button>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { AppRoute } from '@/constants/app-route';
import type { ProductResponse } from '@/services/locker-products/locker-products-type';
import { ShoppingBasket } from 'lucide-vue-next';
import { useRouter } from 'vue-router';



interface Props {
    product: ProductResponse
}

const props = defineProps<Props>()
const router = useRouter()



const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR').format(price)
}

const handleAddToCart = () => {
    //   emit('addToCart', props.product)
}

const handleViewDetails = () => {
    //   emit('viewDetails', props.product.id)
    router.push({ name: AppRoute.PRODUCTS.name })
}
</script>

<style scoped></style>