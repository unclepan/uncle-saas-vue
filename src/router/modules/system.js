import Layout from 'layout/index.vue';

const system = [
  {
    path: 'user',
    name: 'system.user.default',
    component: () => import('../../views/system/user/index.vue'),
    meta: { title: 'system.user.default' },
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
    meta: { title: 'system.role.add', noRefresh: true },
  },
  {
    path: 'role/edit/:id',
    name: 'system.role.edit',
    component: () => import('../../views/system/role/edit.vue'),
    meta: { title: 'system.role.edit' },
  },
  {
    path: 'option',
    name: 'system.option.default',
    component: () => import('../../views/system/option/index.vue'),
    meta: { title: 'system.option.default' },
  },
  {
    path: 'option/value/:id',
    name: 'system.option.value',
    component: () => import('../../views/system/option/value/index.vue'),
    meta: { title: 'system.option.value' },
  },
  {
    path: 'functive',
    name: 'system.functive.default',
    component: () => import('../../views/system/functive/index.vue'),
    meta: { title: 'system.functive.default' },
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
