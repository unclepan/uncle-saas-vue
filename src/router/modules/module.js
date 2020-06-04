import Layout from 'layout/index.vue';

const module = [
  {
    path: 'list/:ename/:id',
    name: 'module.list',
    component: () => import('../../views/module/index.vue'),
    meta: { title: 'module.list' },
  },
  {
    path: 'add/:ename/:id',
    name: 'module.add',
    component: () => import('../../views/module/add.vue'),
    meta: { title: 'module.add' },
  },
  {
    path: 'edit/:ename/:id/:vid',
    name: 'module.edit',
    component: () => import('../../views/module/edit.vue'),
    meta: { title: 'module.edit' }, // noAdd 不push到tags-view
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
