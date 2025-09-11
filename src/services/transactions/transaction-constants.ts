enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  // Ajoutez d'autres rôles selon vos besoins
}

export const TransactionRouteApi = {
  default: '/merchant/api/v1/transaction',
  transactionStats: '/merchant/api/v1/transaction/stats_txns_type',
  dashboardStats: '/merchant/api/v1/transaction/dashboard',
  getOne: (id: string) => `/merchant/api/v1/transaction/${id}`,
  getOneName: `/merchant/api/v1/transaction/*`,
  updateStatus: (id: string) => `/merchant/api/v1/transaction/${id}/status`,
  relaunchTransaction: (id: string) => `/merchant/api/v1/transaction/${id}/relaunch`,
  relaunchTransactionName: `/merchant/api/v1/transaction/*/relaunch`,
  updateStatusName: `/merchant/api/v1/transaction/*/status`,
  filter: '/merchant/api/v1/transaction',
}

export { AdminRole }
