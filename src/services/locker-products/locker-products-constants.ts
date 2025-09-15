export const MerchantRouteApi = {
  default: '/locker-products',
  create: '/admin/api/v1/merchant-charge/multiple',
  stats: '/merchant/api/v1/transaction/info_stats',

  transactions: (id: string) => `/admin/api/v1/transaction/merchant/${id}`,
  getOne: (id: string) => `/admin/api/v1/merchant/${id}`,
}

export const productCapsuleData = [
  {
    id: 1,
    name: "coca-cola",
    capsulePath: "/src/assets/allococa/products/capsules/coca-capsule.png",
  },
  {
    id: 2,
    name: "coca-cola zéro",
    capsulePath: "/src/assets/allococa/products/capsules/coca-zero-capsule.png",
  },
  {
    id: 3,
    name: "fanta orange",
    capsulePath: "/src/assets/allococa/products/capsules/fanta-orange-capsule.png",
  },
  {
    id: 4,
    name: "fanta cocktail",
    capsulePath:
      "/src/assets/allococa/products/capsules/fanta-cocktail-capsule.png",
  },
  {
    id: 5,
    name: "fanta fruits rouge",
    capsulePath:
      "/src/assets/allococa/products/capsules/fanta-fruits-rouge-capsule.png",
  },
  {
    id: 6,
    name: "fanta pommes",
    capsulePath: "/src/assets/allococa/products/capsules/fanta-pommes-capsule.png",
  },
  {
    id: 7,
    name: "sprite",
    capsulePath: "/src/assets/allococa/products/capsules/sprite-capsule.png",
  },
  {
    id: 8,
    name: "schweppes tonic",
    capsulePath:
      "/src/assets/allococa/products/capsules/schweppes-tonic-capsule.png",
  },
  {
    id: 9,
    name: "schweppes tonic",
    capsulePath:
      "/src/assets/allococa/products/capsules/schweppes-tonic-capsule.png",
  },
];