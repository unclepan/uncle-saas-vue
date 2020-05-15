import Layout from 'layout/index.vue';

const system = [
  {
    path: 'user',
    name: 'system.user',
    component: () => import('../../views/system/user.vue'),
    meta: { title: 'system.user' },
  },
  {
    path: 'role',
    name: 'system.role',
    component: () => import('../../views/system/role/index.vue'),
    meta: { title: 'system.role' },
  },
];

export default [
  {
    path: '/system',
    name: 'system.default',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: 'system.default' },
    children: [
      ...system,
    ],
  },
];
