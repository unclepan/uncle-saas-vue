import moment from 'moment';
import request from 'wrapper/ajax/basic';

// 动态表单组件
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
  TEXT: {
    name: '输入框',
    components: null,
    formatter: null,
    condition: 'a-input',
  },
  URL: {
    name: '链接',
    components: { key: 'url' },
    formatter: null,
    condition: 'a-input',
  },
  TEXTAREA: {
    name: '多行文本',
    components: null,
    formatter: null,
    condition: 'a-input',
  },
  NUMBER: {
    name: '纯数字',
    components: null,
    formatter: null,
    condition: 'a-input',
  },
  CURRENCY: {
    name: '货币',
    components: null,
    formatter: null,
    condition: 'a-input',
  },
  PERCENT: {
    name: '百分比',
    components: null,
    formatter: null,
    condition: 'a-input',
  },
  DATE: {
    name: '日期',
    components: null,
    formatter: (row, prop) => moment(row[prop]).format('YYYY-MM-DD HH:mm:ss'),
    condition: 'a-date-picker',
  },
  SELECT: {
    name: '下拉选择',
    components: null,
    formatter: null,
    condition: 'a-single',
  },
  SWITCH: {
    name: '开关',
    components: { key: 'state' },
    formatter: null,
    condition: 'a-single',
  },
  UPLOAD: {
    name: '上传',
    components: { key: 'filelink' },
    formatter: null,
    condition: 'a-input',
  },
  RADIO: {
    name: '单选',
    components: null,
    formatter: null,
    condition: 'a-single',
  },
};

// 后台字段配置字段池
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
  if (['URL'].indexOf(item) >= 0) {
    rules = [
      { type: 'url', message: '链接类型', trigger: 'blur' },
    ];
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

// 格式化表格列
function formatColumn(column) {
  return column.reduce((col, item, index) => {
    let c = col;
    if (item.showToList) {
      c = col.concat({
        ...item,
        components: fieldEnum[item.columnType].components,
        formatter: fieldEnum[item.columnType].formatter,
        align: !index ? 'left' : 'center',
        fixed: !index,
        'min-width': '200',
      });
    }
    return c;
  }, []);
}

// 格式化搜索条件
function formatCondList(column) {
  return column.reduce((col, item) => {
    let c = col;
    if (item.showToList && item.searchAsList) {
      const meta = {
        label: item.label,
      };
      if (item.options && fieldEnum[item.columnType].condition !== 'a-input') {
        meta.optionsFun = async (search) => {
          const op = await request({
            url: item.options,
            method: 'GET',
            params: { search },
          });
          return op.data;
        };
      }
      if (item.columnType === 'SWITCH') {
        meta.optionsFun = () => [
          {
            name: '开启状态',
            value: true,
          },
          {
            name: '关闭状态',
            value: false,
          },
        ];
        meta.isSearch = false;
      }
      if (['NUMBER', 'CURRENCY', 'PERCENT'].indexOf(item.columnType) >= 0) {
        meta.type = 'number';
      }
      c = col.concat({
        name: item.prop,
        key: fieldEnum[item.columnType].condition,
        value: '',
        meta,
      });
    }
    return c;
  }, []);
}

export {
  Fields,
  itemEnum,
  formatColumn,
  formatCondList,
};
