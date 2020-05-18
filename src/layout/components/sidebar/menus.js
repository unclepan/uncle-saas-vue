export default [
  {
    id: '1',
    menuName: 'home',
    invokeUrl: '/index',
    iconStr: 'el-icon-s-home',
    subMenus: [],
  },
  {
    id: '2',
    menuName: 'system.default',
    invokeUrl: '/system',
    iconStr: 'el-icon-s-tools',
    subMenus: [
      {
        id: '3',
        menuName: 'system.user.default',
        invokeUrl: '/system/user',
        subMenus: [],
      },
      {
        id: '4',
        menuName: 'system.role.default',
        invokeUrl: '/system/role',
        subMenus: [],
      },
      {
        id: '5',
        menuName: 'system.option.default',
        invokeUrl: '/system/option',
        subMenus: [],
      },
      {
        id: '6',
        menuName: 'system.functive.default',
        invokeUrl: '/system/functive',
        subMenus: [],
      },
    ],
  },
];
