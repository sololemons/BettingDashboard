import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Dashboard from '@/views/Dashboard.vue'
import Analytics from '@/components/DashboardComponents/Analytics.vue'
import Stle from '@/components/stle.vue'
import Profiles from '@/components/DashboardComponents/Profiles.vue'
import Customers from '@/components/DashboardComponents/Customers.vue'
import Games from '@/components/DashboardComponents/Games.vue'
import Transaction from '@/components/DashboardComponents/Transaction.vue'
import { requireAuth } from '@/stores/authGuard'
import Unauthorized from '@/components/unauthorized.vue'
import ViewModal from '@/components/Modals/ViewModal.vue'






const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUp
    },

    {
      path: '/dashboard',
      name: '/dashboard',
      component: Dashboard,
      beforeEnter: requireAuth,
      children: [
        {
          path: '/analytics',
          name: 'analytics',
          component: Analytics,

        },
        {
          path: '/profiles',
          name: 'profiles',
          component: Profiles
        },

        {
          path: '/customers',
          name: 'customers',
          component: Customers,

        },
        {
          path: '/games',
          name: 'games',
          component: Games,

        },

        {
          path: '/transaction',
          name: 'transaction',
          component: Transaction,

        },
        {
          path: '/unauthorized',
          name: 'unauthorized',
          component: Unauthorized
        },
        {
          path: '/viewAdmins',
          component: ViewModal
        }


      ]
    },
    {
      path: '/stle',
      component: Stle
    },







  ]
})

export default router