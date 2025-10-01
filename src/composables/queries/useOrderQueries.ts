import type { DefaultFiltersPayload, OrderFiltersPayload } from '@/services/global.type'
import { productsQueryKeys } from '@/services/locker-products/locker-products-query-keys'
import { createOrder, fetchFilterOrders, fetchProductsByCategory } from '@/services/locker-products/locker-products-service'
import type { CreateOrderPayload, DeliveryPayload } from '@/services/locker-products/locker-products-type'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

const initialFilters: OrderFiltersPayload = {
  q: undefined,
  page: 1,
  limit: 10,
  dates:[]
}

const filters = reactive<OrderFiltersPayload>({
  ...initialFilters,
})
export function useOrdersFiltersQuery() {
  const queryClient = useQueryClient()

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: productsQueryKeys.ordersFilters({
        ...filters,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      productsQueryKeys.ordersFilters({
        ...filters,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFilterOrders({
        ...filters,
      }),
 
  })

  watch(
    () => ({
      q: filters.q,
      dates: filters.dates
    }),
    () => {
      filters.page = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    filters,
    invalidateQuery,
  }
}
export function useCreateOrderMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),

    onSuccess: () => {
  
    }
  })
}