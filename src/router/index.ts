import { AppRoute } from '@/constants/app-route'
import { createRouter, createWebHistory } from 'vue-router'
import { requiresAuth } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_API_URL),
  routes: [
    {
      path: AppRoute.LOGIN.path,
      name: AppRoute.LOGIN.name,
      component: () => import('@/views/guests/LoginView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.LOST_PASSWORD.path,
      name: AppRoute.LOST_PASSWORD.name,
      component: () => import('@/views/guests/ForgetPasswordView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.VERIFY_EMAIL.path,
      name: AppRoute.VERIFY_EMAIL.name,
      component: () => import('@/views/guests/forgetPassword/verifyEmailView.vue'),
      beforeEnter: (to, from) => {
        if(from.name === AppRoute.LOST_PASSWORD.name ) {
          return true;
        }
        // reject the navigation
        return AppRoute.LOST_PASSWORD.name
      },
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.UPDATE_PASSWORD.path,   
      name: AppRoute.UPDATE_PASSWORD.name,
      component: () => import('@/views/guests/forgetPassword/definePasswordView.vue'),
      // beforeEnter:Auth.authIsRequire,
      beforeEnter: (to, from) => {
        if(to.query.token) {
          return true;
        }
        // reject the navigation
        return AppRoute.LOST_PASSWORD.name
      },
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.SUCCESS_UPDATE_PASSWORD.path,
      name: AppRoute.SUCCESS_UPDATE_PASSWORD.name,
      component: () => import('@/views/guests/forgetPassword/successResetPasswordView.vue'),
      beforeEnter: (to, from) => {
        if(from.name === AppRoute.UPDATE_PASSWORD.name ) {
          return true;
        }
        return AppRoute.LOGIN.name
      },
      meta: { requiresAuth: false },
    },

    {
      path: AppRoute.ADMIN.path,
      name: AppRoute.ADMIN.name,
      component: () => import('@/components/layouts/DefaultLayout.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { layout: 'DefaultLayout', requiresAuth: true },
      redirect: AppRoute.DASHBOARD,
      children: [
        {
          path: AppRoute.DASHBOARD.path,
          name: AppRoute.DASHBOARD.name,
          component: () => import('@/views/DashboardView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.TRANSFERED.path,
          name: AppRoute.TRANSFERED.name,
          component: () => import('@/views/transfered/transferedView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.COLLECTED.path,
          name: AppRoute.COLLECTED.name,
          component: () => import('@/views/collected/collectedView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.WALLET.path,
          name: AppRoute.WALLET.name,
          component: () => import('@/views/wallets/walletsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.SECURITY.path,
          name: AppRoute.SECURITY.name,
          component: () => import('@/views/security/securityView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
      {
          path: AppRoute.RATE_BY_AGGREGATOR.path,
          name: AppRoute.RATE_BY_AGGREGATOR.name,
          component: () => import('@/views/ratesByAggregator/ratesByAggregatorView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
      {
          path: AppRoute.PROFIL.path,
          name: AppRoute.PROFIL.name,
          component: () => import('@/views/ProfilView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.TRANSACTIONS.path,
          name: AppRoute.TRANSACTIONS.name,
          component: () => import('@/views/transactions/transactionsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
      

        // Administration   =============== **************
        {
          path: AppRoute.ADMINISTRATION.path,
          name: AppRoute.ADMINISTRATION.name,
          component: () => import('@/views/administration/AdministrationView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ADMINISTRATION_USER.path,
          name: AppRoute.ADMINISTRATION_USER.name,
          component: () => import('@/views/administration/administrationUserView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
      ],
    },

    {
      path: AppRoute.ABOUT.path,
      name: AppRoute.ABOUT.name,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: "/:catchAll(.*)*",
       component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach(requiresAuth)

export default router
