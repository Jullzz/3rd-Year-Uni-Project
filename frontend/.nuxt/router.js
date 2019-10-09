import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

<<<<<<< HEAD
const _6a760280 = () => interopDefault(import('..\\pages\\Table.vue' /* webpackChunkName: "pages_Table" */))
const _3968ada4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
=======
const _3d84060a = () => interopDefault(import('../pages/Table.vue' /* webpackChunkName: "pages/Table" */))
const _0c76b12e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
>>>>>>> Flask-branch

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/Table",
<<<<<<< HEAD
      component: _6a760280,
      name: "Table"
    }, {
      path: "/",
      component: _3968ada4,
=======
      component: _3d84060a,
      name: "Table"
    }, {
      path: "/",
      component: _0c76b12e,
>>>>>>> Flask-branch
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
