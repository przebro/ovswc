import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path : '/atq',
    component : () => import('../views/Atq.vue')
  },
  {
    path : '/res',
    component : () => import('../views/Resources.vue')
  },
  {
    path : '/adm',
    component : () => import('../views/Admin.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
