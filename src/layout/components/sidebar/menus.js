export default [
  {
    id: '1',
    menuName: 'home',
    invokeUrl: '/index',
    iconStr: 'iconhome-fill',
    subMenus: [],
  },
  {
    id: '2',
    menuName: 'system.default',
    invokeUrl: '/system',
    iconStr: 'iconcoupons-fill',
    subMenus: [
      {
        id: '3',
        menuName: 'system.user',
        invokeUrl: '/system/user',
        subMenus: [],
      },
    ],
  },
];
