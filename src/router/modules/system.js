import Layout from 'layout/index.vue';

const system = [
  {
    path: 'user',
    name: 'system.user',
    component: () => import('../../views/system/user.vue'),
    meta: { title: 'system.user' },
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
