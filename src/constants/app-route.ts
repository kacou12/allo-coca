export const AppRoute = Object.freeze({
  // APP_MOBILE: { name: 'App mobile' },
  UNAUTHORIZE: '/unauthorize',

  LOGIN: {
    name: 'login',
    path: '/login',
  },
  HOME: {
    name: 'home',
    path: '/',
  },
  PRODUCTS: {
    name: 'products',
    path: '/products',
  },
  ORDERS:{
    name: 'orders',
    path: '/orders',
  },
  DELIVERY_INITIALISATON:{
    name: 'delivery-initialization',
    path: '/delivery/initialization',
  },
  DELIVERY_SUCCESS:{
    name: 'delivery-success',
    path: '/delivery/success',
  },
  HOME_REDIRECT: {
    name: 'home-redirect',
    path: '/',
  },
  LOST_PASSWORD: {
    name: 'lost-password',
    path: '/lost-password',
  },
  ABOUT: {
    name: 'about',
    path: '/about',
  },
  VERIFY_EMAIL: {
    name: 'verify-email',
    path: '/verify-email',
  },
  UPDATE_PASSWORD: {
    name: 'update-password',
    path: '/reset',
  },
  SUCCESS_UPDATE_PASSWORD: {
    name: 'success-update-password',
    path: '/success-update-password',
  },
})
