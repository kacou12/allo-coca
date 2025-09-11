export const MerchantRequestsRouteApi = {
  default: '/merchant/api/v1/merchant-request',
  merchantStats: '/merchant/api/v1/transaction/info_stats',
  update: (id: string) => `/merchant/api/v1/merchant-request/${id}`,
}

export const BankLists = Object.freeze({
  ECO_BANK: {
    name: 'Ecobank',
    value: 'ecobank',
  },
  // MANSA_BANK: {
  //   name: "Mansa bank",
  //   value: "mansa_bank",
  // },
})

// status : pending, approved, rejected
// type : deposit, withdrawal
