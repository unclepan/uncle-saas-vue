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
export default itemEnum;
