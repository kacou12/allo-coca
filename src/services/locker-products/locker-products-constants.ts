export const lockerRouteApi = {
  default: 'app/api/v1/variant',
  order: '/client/api/v1/order',
  createOrder: '/client/api/v1/order',
  stats: '/merchant/api/v1/transaction/info_stats',

  transactions: (id: string) => `/admin/api/v1/transaction/merchant/${id}`,
  getOne: (id: string) => `/admin/api/v1/merchant/${id}`,
}

export const productCapsuleData = [
  {
    id: 1,
    name: "coca-cola",
    capsulePath: "coca-capsule.png",
  },
  {
    id: 2,
    name: "coca-cola zéro",
    capsulePath: "coca-zero-capsule.png",
  },
  {
    id: 3,
    name: "fanta orange",
    capsulePath: "fanta-orange-capsule.png",
  },
  {
    id: 4,
    name: "fanta cocktail",
    capsulePath:
      "fanta-cocktail-capsule.png",
  },
  {
    id: 5,
    name: "fanta fruits rouge",
    capsulePath:
      "fanta-fruits-rouge-capsule.png",
  },
  {
    id: 6,
    name: "fanta pommes",
    capsulePath: "fanta-pommes-capsule.png",
  },
  {
    id: 7,
    name: "sprite",
    capsulePath: "sprite-capsule.png",
  },
  {
    id: 8,
    name: "schweppes tonic",
    capsulePath:
      "schweppes-tonic-capsule.png",
  },
  {
    id: 9,
    name: "schweppes tonic",
    capsulePath:
      "schweppes-tonic-capsule.png",
  },
];