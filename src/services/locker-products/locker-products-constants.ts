export const MerchantRouteApi = {
  default: '/locker-products',
  create: '/admin/api/v1/merchant-charge/multiple',
  stats: '/merchant/api/v1/transaction/info_stats',

  transactions: (id: string) => `/admin/api/v1/transaction/merchant/${id}`,
  getOne: (id: string) => `/admin/api/v1/merchant/${id}`,
}
