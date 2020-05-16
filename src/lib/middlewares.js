import message from 'lib/message';

const middle = {
  init(oper) {
    return oper.map((item) => {
      debugger;
      let func;
      if (item.func instanceof Function) {
        func = item.func;
      } else if (item.func instanceof Object && item.func.name && item.func.value) {
        func = middle[item.func.name](item.func.value);
      } else {
        func = (data) => {
          console.log(data, '参数传入类型不正确，执行任何方法');
        };
      }
      return { ...item, func };
    });
  },
  edit(val) {
    return (data) => {
      console.log(data, val, '编辑');
    };
  },
  del(val) {
    return async (data) => {
      const stl = await message.confirm('确认删除？');
      if (stl) {
        console.log(data, val, '删除');
      }
    };
  },
  test(val) {
    return (data) => {
      console.log(data, val, '测试');
    };
  },
};

export default middle;
