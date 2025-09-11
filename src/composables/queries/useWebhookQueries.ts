import { authQueryKeys } from '@/services/auth/auth-query-keys'
import type { WebhookFiltersPayload } from '@/services/global.type'
import { merchantsQueryKeys } from '@/services/merchants/merchant-query-keys'
import { webhookQueryKeys } from '@/services/webhook/webhook-query-keys'
import {
  createWebhook,
  deleteWebhook,
  fetchFiltersWebhook,
  fetchWebhookById,
  updateWebhook,
} from '@/services/webhook/webhook-service'
import type {
  WebhookPayload,
  WebhookRequest
} from '@/services/webhook/webhook-type'
import { useWebhookFiltersStore } from '@/stores/useWebhookStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

const useFilters = storeToRefs(useWebhookFiltersStore())

  const buildTransactionFiltersPayload = (): WebhookFiltersPayload => ({
        page: useFilters.page.value,
        q: useFilters.q.value,
        environment: useFilters.environment.value,
        merchant_id: useFilters.merchant_id.value,
        size: useFilters.size.value,
  })
export function useWebhookFiltersQuery() {
  
  const query = useQuery({
    queryKey: computed(() =>
      webhookQueryKeys.webhookFilters(buildTransactionFiltersPayload()),
    ),

    queryFn: ({ signal }) =>
      fetchFiltersWebhook(buildTransactionFiltersPayload()),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      // page: useFilters.page.value,
      q: useFilters.q.value,
      environment: useFilters.environment.value,
      merchant_id: useFilters.merchant_id.value,
      size: useFilters.size.value,
    }),
    () => {
      useFilters.page.value = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,

    // filters,
  }
}

export function useCreateWebhook() {
 const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: WebhookRequest) => createWebhook(values),

    onSuccess: () => {
      // console.log('create web hook successfully')
      queryClient.invalidateQueries({ queryKey: webhookQueryKeys.webhookFilters(buildTransactionFiltersPayload()) })
    },
     onError: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profil })
    },
  })
}

export function useWebhookQuery(id: string) {
  return useQuery({
    queryKey: computed(() => webhookQueryKeys.webhook(id)),
    queryFn: ({ signal }) => fetchWebhookById(id),
    enabled: false,
  })
}

export function useCreateWebhookMutation(merchant_id:string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: WebhookRequest) => createWebhook(values),

    onSuccess: () => {
      // console.log('create web hook successfully')
      queryClient.invalidateQueries({ queryKey: webhookQueryKeys.webhookFilters(buildTransactionFiltersPayload()) })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profil })
    },
  })
}

export function useUpdateWebhookMutation(id: string) {
  const queryClient = useQueryClient()
   return useMutation({
    mutationFn: (payload: WebhookPayload) => updateWebhook(id, payload),

    onSuccess: () => {
      // console.log('update web hook successfully')

      queryClient.invalidateQueries({ queryKey: webhookQueryKeys.webhookFilters(buildTransactionFiltersPayload()) })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profil })
    },
  })
}

export function useDeleteWebhookMutation(merchant_id:string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteWebhook(id),

    onSuccess: () => {
      // console.log('delete web hook  successfully')
      queryClient.invalidateQueries({ queryKey:webhookQueryKeys.webhookFilters(buildTransactionFiltersPayload()) })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profil })
    },
  })
}
