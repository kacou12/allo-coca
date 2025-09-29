import { productsQueryKeys } from '@/services/locker-products/locker-products-query-keys'
import { createOrder, fetchProductsByCategory } from '@/services/locker-products/locker-products-service'
import type { CreateOrderPayload, DeliveryPayload } from '@/services/locker-products/locker-products-type'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive } from 'vue'


export function useCreateOrderMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),

    onSuccess: () => {
  
    }
  })
}