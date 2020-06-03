export default [
  {
    id: '1',
    menuName: 'home',
    invokeUrl: '/index',
    iconStr: 'el-icon-school',
    subMenus: [],
  },
  {
    id: '2',
    menuName: 'system.default',
    invokeUrl: '/system',
    iconStr: 'el-icon-setting',
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
      {
        id: '7',
        menuName: 'system.module.default',
        invokeUrl: '/system/module',
        subMenus: [],
      },
    ],
  },
  {
    id: '8',
    menuName: 'socket',
    invokeUrl: '/socket',
    iconStr: 'el-icon-chat-line-square',
    subMenus: [],
  },
];
