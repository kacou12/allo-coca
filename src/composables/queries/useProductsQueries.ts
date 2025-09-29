import { productsQueryKeys } from '@/services/locker-products/locker-products-query-keys'
import { fetchProductsByCategory } from '@/services/locker-products/locker-products-service'

import { useQuery } from '@tanstack/vue-query'
import { computed, reactive } from 'vue'

const initialFilters = {
//   q: undefined,
  page: 1,
  limit: 100
}

const filters = reactive({
  ...initialFilters,
})

export function useProductsByCategoryQuery(category_id:string) {
  return useQuery({
    queryKey: computed(() => productsQueryKeys.productsPagination(filters.page, filters.limit, category_id)),
    queryFn: ({ signal }) => fetchProductsByCategory(category_id, filters),
    // enabled: false,
  })
}
