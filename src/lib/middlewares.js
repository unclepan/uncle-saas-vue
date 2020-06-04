import message from 'lib/message';
import router from 'router';
import request from 'wrapper/ajax/basic';

const middle = {
  init(oper, components, funName = 'func') {
    return oper.map((i) => {
      if (funName === 'options' && !i.options) {
        return { ...i };
      }
      const item = i;
      let func;
      if (item[funName] instanceof Function || (item[funName] instanceof Array && funName === 'options')) {
        func = item[funName];
      } else if (item[funName] instanceof Object && item[funName].name && item[funName].value && middle[item[funName].name](item[funName].value)) {
        // 对象类型，有name和value属性，并且能在middle对象中找到
        item[funName].value.components = components;
        func = middle[item[funName].name](item[funName].value);
      } else {
        func = () => {
          throw Error('参数传入类型不正确，未执行任何方法，请检查方法传入的类型');
        };
      }
      return { ...item, [funName]: func };
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
          method: 'DELETE',
          params: val.params,
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

  // 公共选项值
  option(val) {
    return async (cb, search = '') => {
      const res = await request({
        url: val.apiName,
        method: 'GET',
        params: { search },
      });
      cb(res);
    };
  },

  forModuleEdit(val) {
    return (data) => {
      const { ename, id } = val.components.$route.params;
      const { _id: vid } = data;
      router.push({ name: val.pathName, params: { ename, id, vid } });
    };
  },
  forModuleDel(val) {
    return async (data) => {
      const stl = await message.confirm('确认删除？');
      if (stl) {
        const { id } = val.components.$route.params;
        const { _id: vid } = data;
        request({
          url: `${val.apiName}/${id}/${vid}`,
          method: 'DELETE',
          params: val.params,
        }).then(() => {
          message.success('删除成功');
          val.components.init();
        });
      }
    };
  },
};

export default middle;
