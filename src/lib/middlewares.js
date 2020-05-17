import message from 'lib/message';
import router from 'router';
import request from 'wrapper/ajax/basic';

const middle = {
  tableOperationInit(oper, components) {
    return oper.map((i) => {
      const item = i;
      let func;
      if (item.func instanceof Function) {
        func = item.func;
      } else if (item.func instanceof Object && item.func.name && item.func.value && middle[item.func.name](item.func.value)) {
        // 对象类型，有name和value属性，并且能在middle对象中找到
        item.func.value.components = components;
        func = middle[item.func.name](item.func.value);
      } else {
        func = () => {
          throw Error('参数传入类型不正确，未执行任何方法，请检查func传入的类型');
        };
      }
      return { ...item, func };
    });
  },
  edit(val) {
    return (data) => {
      const { _id: id } = data;
      router.push({ name: val.pathName, params: { id } });
    };
  },
  del(val) {
    return async (data) => {
      const stl = await message.confirm('确认删除？');
      if (stl) {
        const { _id: id } = data;
        request({
          url: `${val.apiName}/${id}`,
          method: val.method,
        }).then(() => {
          message.success('删除成功');
          val.components.init();
        });
      }
    };
  },
  dialogEdit(val) {
    return (data) => {
      val.components.$refs.dataDialog.open({ type: 'edit', title: '编辑', data });
    };
  },
  test(val) {
    return (data) => {
      console.log(data, val, '测试');
    };
  },
};

export default middle;
