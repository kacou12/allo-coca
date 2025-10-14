import { AppRoute } from "@/constants/app-route";
import { createRouter, createWebHistory } from "vue-router";
import { requiresAuth } from "./guards";
import { useCart } from "@/composables/queries/useCart";
import { storeToRefs } from "pinia";
import { getAccessToken } from "@/services/auth/auth-util";
import { useAuthStore } from "@/stores/useAuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_API_URL),
   scrollBehavior(to, from, savedPosition) {
     if (to.hash) {
      return {
        el: to.hash, // Scroll to the element with the ID specified in the hash
        behavior: 'smooth', // Optional: for smooth scrolling
      };
    } else if (savedPosition) {
      return savedPosition; // Restore scroll position on back/forward navigation
    } else {
      return { top: 0 }; // Default: scroll to the top of the page
    }
  },
  routes: [
    {
      path: AppRoute.LOGIN.path,
      name: AppRoute.LOGIN.name,
      component: () => import("@/views/guests/LoginView.vue"),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: true },
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
      path: AppRoute.REGISTER.path,
      name: AppRoute.REGISTER.name,
      component: () => import("@/views/guests/RegisterView.vue"),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: true },
    },
    {
      path: AppRoute.HOME.path,
      name: AppRoute.HOME.name,
      // component: () => import('@/views/HomeView.vue'),
      component: () => import("@/components/layouts/DefaultLayout.vue"),
      // beforeEnter:Auth.authIsRequire,
      redirect: AppRoute.HOME_REDIRECT.path,
      meta: { requiresAuth: false, layout: "DefaultLayout" },
      children: [
        {
          path: AppRoute.HOME_REDIRECT.path,
          name: AppRoute.HOME_REDIRECT.name,
          component: () => import("@/views/HomeView.vue"),
          // beforeEnter:Auth.authIsRequire,
          meta: { requiresAuth: false },
        },
        {
          path: AppRoute.PRODUCTS.path,
          name: AppRoute.PRODUCTS.name,
          component: () => import("@/views/allococa/ProductsView.vue"),
          // beforeEnter:Auth.authIsRequire,
          meta: { requiresAuth: false },
        },
        {
          path: AppRoute.ORDERS.path,
          name: AppRoute.ORDERS.name,
          component: () => import("@/views/allococa/orders/OrdersView.vue"),
          // beforeEnter:Auth.authIsRequire,
          meta: { requiresAuth: true },
        },
        {
          path: AppRoute.PROFIL.path,
          name: AppRoute.PROFIL.name,
          component: () => import("@/views/allococa/ProfilView.vue"),
          // beforeEnter:Auth.authIsRequire,
          meta: { requiresAuth: true,  },
        },
        {
          path: AppRoute.DELIVERY_INITIALISATON.path,
          name: AppRoute.DELIVERY_INITIALISATON.name,
          component: () =>
            import("@/views/allococa/orders/DeliveryInitialisationView.vue"),
          // beforeEnter:Auth.authIsRequire,
          beforeEnter: (to, from) => {
            const { cart } = storeToRefs(useCart());
            const { isAuth } = storeToRefs(useAuthStore());
            if (!isAuth.value) {
              return AppRoute.LOGIN.name;
            }
            if (cart.value.length > 0) {
              return true;
            }
            return AppRoute.HOME.name;
          },
          meta: { requiresAuth: false },
        },
        {
          path: AppRoute.DELIVERY_SUCCESS.path,
          name: AppRoute.DELIVERY_SUCCESS.name,
          component: () =>
            import("@/views/allococa/orders/DeliverySuccessView.vue"),
          // beforeEnter:Auth.authIsRequire,
          beforeEnter: (to, from) => {
            const { cart } = storeToRefs(useCart());
            if (from.name === AppRoute.DELIVERY_INITIALISATON.name) {
              return true;
            }
            return AppRoute.HOME.name;
          },
          meta: { requiresAuth: false },
        },
      ],
    },
    {
      path: AppRoute.ABOUT.path,
      name: AppRoute.ABOUT.name,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/:catchAll(.*)*",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

router.beforeEach(requiresAuth)

export default router;
