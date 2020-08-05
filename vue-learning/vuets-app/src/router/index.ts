import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: '/password',
    name: 'password',
    component: () => import("@/views/login/Password.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由判断
router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = localStorage.tsToken ? true : false;
  if (to.path === "/login" || to.path === "/password") {
    next()
  } else {
    if (isLogin) {
      next()
    } else {
      //如果没有登录，也不是登录页和忘记密码必须要去登录页
      next('/login')
    }
  }
})

export default router
