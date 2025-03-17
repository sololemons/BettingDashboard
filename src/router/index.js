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
      children: [
        {
        path: '/analytics',
        name: 'analytics',
        component: Analytics
        },
        {
          path: '/profiles',
          name: 'profiles',
          component: Profiles
        },

        {
          path: '/customers',
          name: 'customers',
          component: Customers
        },
        {
          path: '/games',
          name: 'games',
          component: Games
        },
        { 
          path: '/transaction',
          name: 'transaction',
          component: Transaction
        }


      ]
    },
    {
      path: '/stle',
      component: Stle
    }
   
    
 
  
  
  ]
})

export default router