import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '../views/Layout/Index.vue';

Vue.use(VueRouter)
/**
 * hidden: true          为true在左侧菜单栏显示，否则不显示
 * name: "router-name"   路由名称 必写
 * meta: {
 *  title: "title"       对应路由在左侧菜单的标题名称
 *  icon: "icon-class"   对应路由在左侧菜单的图标样式
 * }
 */
export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    redirect: "/home",
    hidden: true,
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
          icon: "fa fa-home",
        },
        component: () => import("@/views/Home.vue")
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: false,
    meta: {
      title: "系统登录",
    },
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: '/password',
    name: 'password',
    hidden: false,
    meta: {
      title: "找回密码",
    },
    component: () => import("@/views/login/Password.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
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
