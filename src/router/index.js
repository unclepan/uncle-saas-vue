import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Layout from 'layout/index.vue';

import System from './modules/system';

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: '/login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
    name: 'login',
    meta: { title: 'login' },
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/register'),
    name: 'register',
    meta: { title: 'register' },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "index" */ '@/views/home/index'),
        name: 'home',
        meta: { title: 'home', affix: true }, // title 用于国际化等，affix 固定钉
      },
    ],
  },
  ...System,
];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
