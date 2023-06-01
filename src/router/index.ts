import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      routerName: 'Home',
      menuName: '首页'
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
        meta: {
          routerName: 'Home',
          menuName: '首页'
        }
      },
      {
        path: 'user-mgn',
        name: 'UserMgn',
        component: () => import(/* webpackChunkName: "UserMgn" */ '../views/user-mgn/index.vue'),
        meta: {
          routerName: 'UserMgn',
          menuName: '用户管理'
        }
      },
      {
        path: 'priority-mgn',
        name: 'PriorityMgn',
        component: () => import(/* webpackChunkName: "PriorityMgn" */ '../views/priority-mgn/index.vue'),
        meta: {
          routerName: 'PriorityMgn',
          menuName: '权限管理'
        }
      },
      {
        path: 'log-mgn',
        name: 'LogMgn',
        component: () => import(/* webpackChunkName: "LogMgn" */ '../views/log-mgn/index.vue'),
        meta: {
          routerName: 'LogMgn',
          menuName: '日志管理'
        }
      },
      {
        path: 'menu-mgn',
        name: 'MenuMgn',
        component: () => import(/* webpackChunkName: "MenuMgn" */ '../views/menu-mgn/index.vue'),
        meta: {
          routerName: 'MenuMgn',
          menuName: '菜单管理'
        }
      },
      {
        path: 'content-mgn',
        name: 'ContentMgn',
        component: () => import(/* webpackChunkName: "ContentMgn" */ '../views/content-mgn/index.vue'),
        meta: {
          routerName: 'ContentMgn',
          menuName: '内容管理'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
