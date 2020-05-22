import Layout from 'layout/index.vue';

const module = [
  {
    path: 'list/:id',
    name: 'module.list',
    component: () => import('../../views/module/index.vue'),
    meta: { title: 'module.list' },
  },
  {
    path: 'add/:id',
    name: 'module.add',
    component: () => import('../../views/module/add.vue'),
    meta: { title: 'module.add' },
  },
  {
    path: 'edit/:id/:vid',
    name: 'module.edit',
    component: () => import('../../views/module/edit.vue'),
    meta: { title: 'module.edit' },
  },
];

export default [
  {
    path: '/module',
    name: 'module.rec',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: 'module.rec' },
    children: [
      ...module,
    ],
  },
];
