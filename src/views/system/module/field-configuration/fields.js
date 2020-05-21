export default [
  {
    name: 'text',
    value: '',
    label: '输入框',
    type: 'TEXT',
    rules: [],
    describe: '',
    meta: {
      placeholder: '请填写内容',
    },
    event: {
      emit: '',
      on: '',
    },
    set: false,
  },
  {
    name: 'textarea',
    value: '',
    label: '多行文本输入框',
    type: 'TEXTAREA',
    rules: [],
    describe: '',
    meta: {
      placeholder: '请填写内容',
    },
    event: {
      emit: '',
      on: '',
    },
    set: false,
  },
  {
    name: 'number',
    value: '',
    label: '纯数字',
    type: 'NUMBER',
    rules: [
      { type: 'number', message: '必须为数字', trigger: 'blur' },
    ],
    describe: '',
    meta: {
      placeholder: '请填写内容',
    },
    event: {
      emit: '',
      on: '',
    },
    set: false,
  },
  {
    name: 'currency',
    value: '',
    label: '货币',
    type: 'CURRENCY',
    rules: [
      { type: 'number', message: '货币必须为数字', trigger: 'blur' },
    ],
    describe: '',
    meta: {
      placeholder: '请填写内容',
    },
    event: {
      emit: '',
      on: '',
    },
    set: false,
  },
  {
    name: 'percent',
    value: '',
    label: '百分比',
    type: 'PERCENT',
    rules: [
      { type: 'number', message: '百分比必须为数字', trigger: 'blur' },
    ],
    describe: '',
    meta: {
      placeholder: '请填写内容',
    },
    event: {
      emit: '',
      on: '',
    },
    set: false,
  },
  {
    name: 'dete',
    value: '',
    label: '选择日期',
    type: 'DATE',
    rules: [],
    describe: '这是时间字段',
    meta: {
      placeholder: '请选择日期',
    },
    event: {
      emit: '',
      on: '',
    },
    set: false,
  },
  {
    name: 'select',
    value: '',
    label: '下拉选择',
    type: 'SELECT',
    rules: [],
    describe: '选择组件，是个强大的组件',
    meta: {
      placeholder: '请选择内容',
    },
    options: [],
    event: {
      emit: '',
      on: '',
    },
    set: false,
  },
  {
    name: 'switch',
    value: false,
    label: '开关',
    type: 'SWITCH',
    rules: [],
    meta: {},
    event: {
      emit: '',
      on: '',
    },
    set: false,
  },
  {
    name: 'upload',
    value: '',
    label: '文件上传',
    type: 'UPLOAD',
    rules: [],
    describe: '',
    meta: {
      action: '/api/file/upload',
    },
    event: {
      emit: '',
      on: '',
    },
    set: false,
  },
  {
    name: 'radio',
    value: '',
    label: 'RADIO单选',
    type: 'RADIO',
    rules: [],
    describe: '',
    meta: {},
    options: [{ name: '男', value: 'male' }, { name: '女', value: 'female' }],
    event: {
      emit: '',
      on: '',
    },
    set: false,
  },

  {
    name: 'test1',
    value: '',
    label: '通信测试字段一',
    type: 'TEXT',
    rules: [],
    describe: '',
    meta: {
      placeholder: '请填写内容',
    },
    event: {
      emit: "[{'name':'transactionAmountCnCreate'}]",
      on: '',
    },
    set: false,
  },
  {
    name: 'test2',
    value: '',
    label: '通信测试字段二',
    type: 'TEXT',
    rules: [],
    describe: '',
    meta: {
      placeholder: '请填写内容',
    },
    event: {
      emit: 'null',
      on: "{'name':'transactionAmountCnCreate','listener': 'function listener(toComponent) {return function (fromComponent) {var to = toComponent;console.log(fromComponent, to);};}' }",
    },
    set: false,
  },
];
