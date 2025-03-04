import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Dashboard from '@/views/Dashboard.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Analytics from '@/components/Analytics.vue'
import Stle from '@/components/stle.vue'

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