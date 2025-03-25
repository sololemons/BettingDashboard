import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Dashboard from '@/views/Dashboard.vue'
import Analytics from '@/components/Analytics.vue'
import Stle from '@/components/stle.vue'
import Profiles from '@/components/Profiles.vue'
import Customers from '@/components/Customers.vue'
import Games from '@/components/Games.vue'
import Transaction from '@/components/Transaction.vue'
import { requireAuth } from '@/stores/authGuard'
import Unauthorized from '@/components/unauthorized.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name : 'signUp',
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
        meta: { role: 'SuperAdmin' }
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
          meta: { role: 'CustomerCare' }
        },
        {
          path: '/games',
          name: 'games',
          component: Games,
          meta: { role: 'CustomerCare' }
        },
      
        { 
          path: '/transaction',
          name: 'transaction',
          component: Transaction,
          meta: {role: 'SuperAdmin'}
        },
        {
          path: '/unauthorized',
          name: 'unauthorized',
          component: Unauthorized
        },


      ]
    },
    {
      path: '/stle',
      component: Stle
    }
   
    
 
  
  
  ]
})

export default router