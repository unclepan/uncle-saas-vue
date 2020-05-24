import moment from 'moment';

// 1. 动态表单组件
class Fields {
  constructor(data) {
    const Fie = data.reduce((result, Component) => {
      const res = result;
      let { INDEX } = Component;
      if (!INDEX) {
        throw Error('缺乏索引，动态字段组件不能注册');
      }
      if (!Array.isArray(INDEX)) {
        INDEX = [INDEX];
      }
      INDEX.forEach((item) => {
        if (res[item]) {
          throw Error('重复的索引，动态字段组件不能注册');
        }
        res[item] = Component;
      });
      return res;
    }, {});

    Object.keys(Fie).forEach((key) => {
      this[Fields.getKey(key)] = Fie[key];
    });
  }

  static getKey(origin) {
    return `A-${origin}`;
  }
}


const fieldEnum = {
  TEXT: { name: '输入框', components: null, formatter: null },
  TEXTAREA: { name: '多行文本输入框', components: null, formatter: null },
  NUMBER: { name: '纯数字', components: null, formatter: null },
  CURRENCY: { name: '货币', components: null, formatter: null },
  PERCENT: { name: '百分比', components: null, formatter: null },
  DATE: { name: '日期', components: null, formatter: (row, prop) => moment(row[prop]).format('YYYY-MM-DD HH:mm:ss') },
  SELECT: { name: '下拉选择', components: null, formatter: null },
  SWITCH: { name: '开关', components: { key: 'state' }, formatter: null },
  UPLOAD: { name: '上传', components: { key: 'filelink' }, formatter: null },
  RADIO: { name: '单选', components: null, formatter: null },
};

// 2. 后台字段配置字段池
const itemEnum = Object.keys(fieldEnum).map((item) => {
  let rules = [];
  let value = '';
  if (['NUMBER', 'CURRENCY', 'PERCENT'].indexOf(item) >= 0) {
    rules = [
      { type: 'number', message: '数字类型', trigger: 'blur' },
    ];
  }
  if (['SWITCH'].indexOf(item) >= 0) {
    value = false;
  }
  return {
    name: item.toLowerCase(),
    value,
    label: fieldEnum[item].name,
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
    required: false,
    showToList: true,
    searchAsList: false,
  };
});

// .格式化表格列
function formatColumn(column) {
  return column.reduce((col, item) => {
    let c = col;
    if (item.showToList) {
      c = col.concat({
        ...item,
        components: fieldEnum[item.columnType].components,
        formatter: fieldEnum[item.columnType].formatter,
        align: 'center',
        'min-width': '160',
      });
    }
    return c;
  }, []);
}

export {
  Fields,
  itemEnum,
  formatColumn,
};
