import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

import type {
  DashboardFiltersPayload,
  DefaultFiltersPayload,
  MerchantRequestFiltersPayload,
} from '@/services/global.type'
import { merchantRequestsQueryKeys } from '@/services/merchant-request/merchant-request-query-keys'

import {
  depositRequest,
  fetchMerchantRequests,
  withdrawalRequest,
} from '@/services/merchant-request/merchant-request-service'
import { useMerchantRequestStore } from '@/stores/useMerchantRequestStore'
import { storeToRefs } from 'pinia'
import { fetchMerchantStats } from '@/services/merchants/merchant-service'
import type { MerchantDepositRequest, MerchantWithdrawalRequest } from '@/services/merchant-request/merchant-request.type'

const merchantRequestFilters = storeToRefs(useMerchantRequestStore())

const buildMerchantRequestFiltersPayload = (): MerchantRequestFiltersPayload => ({
  limit: merchantRequestFilters.limit.value,
  page: merchantRequestFilters.page.value,
  q: merchantRequestFilters.q.value,
  status: merchantRequestFilters.status.value,
  type: merchantRequestFilters.type.value,
  dates: merchantRequestFilters.dates.value,
})

const invalidateQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: merchantRequestsQueryKeys.merchantRequestsFilters(
      buildMerchantRequestFiltersPayload(),
    ),
  })
}

export function useMerchantRequestsFiltersQuery() {
  const query = useQuery({
    queryKey: computed(() =>
      merchantRequestsQueryKeys.merchantRequestsFilters(buildMerchantRequestFiltersPayload()),
    ),

    queryFn: ({ signal }) => fetchMerchantRequests(buildMerchantRequestFiltersPayload()),
  })

  watch(
    () => ({
      limit: merchantRequestFilters.limit.value,
      q: merchantRequestFilters.q.value,
      status: merchantRequestFilters.status.value,
      type: merchantRequestFilters.type.value,
      dates: merchantRequestFilters.dates.value,
    }),
    () => {
      merchantRequestFilters.page.value = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
  }
}

export function useDepositRequestMutation() {
   const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: MerchantDepositRequest) => depositRequest(payload),

    onSuccess: () => {
      // console.log('validate merchant request successfully')

      invalidateQuery(queryClient)
    },
  })
}

export function usewithdrawalRequestMutation() {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: MerchantWithdrawalRequest) => withdrawalRequest(payload),

    onSuccess: () => {
      // console.log('reject merchant request successfully')

      invalidateQuery(queryClient)
    },
  })
}

export function useMerchantStatsFiltersQuery() {
  const queryClient = useQueryClient()

  const initialFilters: DefaultFiltersPayload = {
    dates: [new Date(), new Date()],
    page: 1,
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateStatsQuery = () => {
    queryClient.invalidateQueries({
      queryKey: merchantRequestsQueryKeys.merchantStatsFilters({
        ...filters,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      merchantRequestsQueryKeys.merchantStatsFilters({
        ...filters,
      }),
    ),

    queryFn: ({ signal }) => fetchMerchantStats({ ...filters }),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      page: filters.page,
      dates: filters.dates,
    }),
    () => {
      filters.page = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    // filters,
    invalidateStatsQuery,
  }
}
