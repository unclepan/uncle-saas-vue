const fieldEnum = {
  TEXT: '输入框',
  TEXTAREA: '多行文本输入框',
  NUMBER: '纯数字',
  CURRENCY: '货币',
  PERCENT: '百分比',
  DATE: '日期',
  SELECT: '下拉选择',
  SWITCH: '开关',
  UPLOAD: '上传',
  RADIO: '单选',
};

const itemEnum = Object.keys(fieldEnum).map((item) => {
  let rules = [];
  if (['NUMBER', 'CURRENCY', 'PERCENT'].indexOf(item) >= 0) {
    rules = [
      { type: 'number', message: '数字类型', trigger: 'blur' },
    ];
  }
  return {
    name: item.toLowerCase(),
    value: '',
    label: fieldEnum[item],
    type: item,
    rules,
    describe: '',
    meta: {},
    options: '',
    event: {
      emit: '',
      on: '',
    },
    set: false,
  };
});
console.log(itemEnum);
export default itemEnum;

// {
//   name: 'test1',
//   value: '',
//   label: '通信测试字段一',
//   type: 'TEXT',
//   rules: [],
//   describe: '',
//   meta: {
//     placeholder: '请填写内容',
//   },
//   event: {
//     emit: "[{'name':'transactionAmountCnCreate'}]",
//     on: '',
//   },
//   set: false,
// },
// {
//   name: 'test2',
//   value: '',
//   label: '通信测试字段二',
//   type: 'TEXT',
//   rules: [],
//   describe: '',
//   meta: {
//     placeholder: '请填写内容',
//   },
//   event: {
//     emit: 'null',
//     on: "{'name':'transactionAmountCnCreate','listener': 'function listener(toComponent) {return function (fromComponent) {var to = toComponent;console.log(fromComponent, to);};}' }",
//   },
//   set: false,
// },
