import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

const Login = () => import('@/views/login')
const Myorder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const Prodetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const notFound = () => import('@/views/notfound')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]
  },
  { path: '/login', component: Login },
  { path: '/myorder', component: Myorder },
  { path: '/pay', component: Pay },
  { path: '/prodetail/:id', component: Prodetail },
  { path: '/search', component: Search },
  { path: '/searchlist', component: SearchList },
  { path: '*', component: notFound }
]

const router = new VueRouter({
  routes
})

const authUrls = ['/myorder', '/pay']
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  if (store.getters.token) {
    next()
  } else {
    next('/login')
  }
})

export default router
