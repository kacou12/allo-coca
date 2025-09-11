import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import type { DefaultFiltersPayload } from '@/services/global.type'
import { keysQueryKeys } from '@/services/keys/key-query-keys'
import { createKey, deleteKey, fetchFiltersKeys } from '@/services/keys/key-service'
import type { KeyRequest } from '@/services/keys/key-type'
import { merchantsQueryKeys } from '@/services/merchants/merchant-query-keys'
import { computed, reactive, watch } from 'vue'
import { authQueryKeys } from '@/services/auth/auth-query-keys'
// Queries
const initialFilters: DefaultFiltersPayload = {
  q: undefined,
  page: 1,
}

const filters = reactive<DefaultFiltersPayload>({
  ...initialFilters,
})
export function useKeysFiltersQuery(enabled: boolean = true) {
  const queryClient = useQueryClient()

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: keysQueryKeys.keysFilters({
        ...filters,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      keysQueryKeys.keysFilters({
        ...filters,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersKeys({
        ...filters,
      }),
    enabled,
  })

  watch(
    () => ({
      q: filters.q,
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

// Mutations
export function useCreateKeyMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: KeyRequest) => createKey(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keysQueryKeys.keysFilters({ ...filters }) })
    },
    onError: () => {
      console.log('====================================');
      console.log('on error ');
      console.log('====================================');
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profil })
    },
  })
}

export function useDeleteKeyMutation(merchant_id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keysQueryKeys.keysFilters({ ...filters }) })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profil })
    },
  })
}

// export function useRegenerateKeyMutation(id: string) {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: () => regenerateKey(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: keysQueryKeys.key(id) })
//       queryClient.invalidateQueries({ queryKey: keysQueryKeys.all })
//     },
//   })
// }
