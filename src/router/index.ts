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
      meta: { requiresAuth: false,  },
    },
    {
      path: AppRoute.HOME.path,
      name: AppRoute.HOME.name,
      // component: () => import('@/views/HomeView.vue'),
      component: () => import('@/components/layouts/DefaultLayout.vue'),
      // beforeEnter:Auth.authIsRequire,
      redirect: AppRoute.HOME_REDIRECT.path,
      meta: { requiresAuth: false,layout: 'DefaultLayout' },
      children: [
        {
          path: AppRoute.HOME_REDIRECT.path,
          name: AppRoute.HOME_REDIRECT.name,
          component: () => import('@/views/HomeView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { requiresAuth: false },
        },
        {
          path: AppRoute.PRODUCTS.path,
          name: AppRoute.PRODUCTS.name,
          component: () => import('@/views/allococa/ProductsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { requiresAuth: false },
        },
      ]
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

// router.beforeEach(requiresAuth)

export default router
