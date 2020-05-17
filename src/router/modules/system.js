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
    name: 'system.role.default',
    component: () => import('../../views/system/role/index.vue'),
    meta: { title: 'system.role.default' },
  },
  {
    path: 'role/add',
    name: 'system.role.add',
    component: () => import('../../views/system/role/add.vue'),
    meta: { title: 'system.role.add' },
  },
  {
    path: 'role/edit/:id',
    name: 'system.role.edit',
    component: () => import('../../views/system/role/edit.vue'),
    meta: { title: 'system.role.edit' },
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
