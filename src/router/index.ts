import { AppRoute } from '@/constants/app-route'
import { createRouter, createWebHistory } from 'vue-router'
import { requiresAuth } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_API_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: AppRoute.LOGIN.path,
      name: AppRoute.LOGIN.name,
      component: () => import('@/views/Guests/LoginView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },

    {
      path: AppRoute.LOST_PASSWORD.path,
      name: AppRoute.LOST_PASSWORD.name,
      component: () => import('@/views/Guests/ForgetPasswordView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.VERIFY_EMAIL.path,
      name: AppRoute.VERIFY_EMAIL.name,
      component: () => import('@/views/Guests/ForgetPassword/VerifyEmailView.vue'),
      // beforeEnter:Auth.authIsRequire,
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
  ],
})

router.beforeEach(requiresAuth)

export default router
