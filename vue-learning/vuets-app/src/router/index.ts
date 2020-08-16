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
    path: '/dataManager',
    name: 'dataManager',
    component: Layout,
    redirect: "/tableData",
    hidden: true,
    meta: {title: "数据管理", icon: "fa fa-database"},
    children: [
      {
        path: "/tableData",
        name: "tableData",
        meta: {
          title: "表格管理",
          icon: "fa fa-table",
        },
        component: () => import("@/views/DataManager/DataTable.vue")
      },
      {
        path: "/chartsData",
        name: "chartsData",
        meta: {
          title: "图表管理",
          icon: "fa fa-bar-chart",
        },
        component: () => import("@/views/DataManager/DataCharts.vue")
      },
      {
        path: "/formData",
        name: "formData",
        meta: {
          title: "表单管理",
          icon: "fa fa-file-text-o",
          roles: ["admin", "editor"]
        },
        component: () => import("@/views/DataManager/DataForm.vue")
      },
    ]
  },
  {
    path: '/UserManager',
    name: 'UserManager',
    component: Layout,
    hidden: true,
    redirect: '/UserAccount',
    children: [
      {
        path: '/UserAccount',
        name: 'UserAccount',
        meta: { title: '账户管理', icon: 'fa fa-user-plus', roles: ['admin'] },
        component: () => import('@/views/UserManager/UserAccount.vue')
      }
    ]
  },
  {
    path: '/user',
    hidden: false,
    redirect: "/userInfo",
    component: Layout,
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: { title: '个人中心' },
        component: () => import('@/views/UserManager/UserInfo.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    hidden: false,
    meta: { title: '404' },
    component: () => import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
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
