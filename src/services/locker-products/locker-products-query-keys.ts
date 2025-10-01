import type { DefaultFiltersPayload, OrderFiltersPayload, TransactionFiltersPayload } from '../global.type'

export const productsQueryKeys = {
  // users: (country: string) => ['users', country],
  product: ({ id }: { id: string }) => ['product', id],
  productsPagination: (page: number, limit: number, category_id: string) => ['products', { page, limit, category_id }],
  productsFilters: (payload: DefaultFiltersPayload) => [
    'product',
    payload.page,
    payload.q,
    // payload.country_id,
  ],
    transactionsProductFilters: (payload: TransactionFiltersPayload) => [
      'transactionsProductFilters',
      { limit: payload.limit },
      { page: payload.page },
      { q: payload.q },
      { status: payload.status },
      { type: payload.type },
      { operator: payload.operator }, // Ajout du champ 'operator'
      { dates: payload.dates },       // Ajout du champ 'dates'
    ],
    ordersFilters: (payload: OrderFiltersPayload) => [
      'ordersFilters',
      { limit: payload.limit },
      { page: payload.page },
      { q: payload.q },
     { dates: payload.dates },       // Ajout du champ 'dates'
    ],
  serviceAvailability: ({ country }: { country: string }) => ['serviceAvailability', country],
  
}
