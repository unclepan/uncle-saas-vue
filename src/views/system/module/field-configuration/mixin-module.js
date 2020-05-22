import _ from 'lodash';

export default {
  methods: {
    delField(itemList, index, element) {
      if (this.editField && (this.editField.key === element.key)) {
        this.editField = null;
        this.editMeta = [];
      }
      itemList.splice(index, 1);
    },
    async setField(i1, i2) {
      let validationStatus = true;
      if (this.editField) {
        validationStatus = await this.fieldValidate();
      }

      if (validationStatus) {
        this.moduleList = this.moduleList.map((item, index1) => {
          const list = item.list.map((i, index2) => {
            if (index1 === i1 && index2 === i2) {
              return { ...i, set: true };
            }
            return { ...i, set: false };
          });
          return { ...item, list };
        });
        this.editField = this.moduleList[i1].list[i2];
        const { meta = {} } = this.editField;
        this.editMeta = [].concat(Object.keys(meta).map((key) => ({ key, value: meta[key] })));
      }
    },
    async unSetField() {
      let validationStatus = true;
      if (this.editField) {
        validationStatus = await this.fieldValidate();
      }
      if (validationStatus) {
        this.moduleList = this.moduleList.map((item) => {
          const list = item.list.map((i) => ({ ...i, set: false }));
          return { ...item, list };
        });
        this.editField = null;
        this.editMeta = [];
      }
    },
    addModule(index) {
      this.moduleList.splice(index, 0, {
        name: '新模块区域（请改名）',
        open: true,
        list: [],
      });
    },
    removeModule(index) {
      if (this.editField) {
        const some = this.moduleList[index].list.some((item) => item.key === this.editField.key);
        if (some) {
          this.editField = null;
          this.editMeta = [];
        }
      }
      this.moduleList.splice(index, 1);
    },
    openModuleDialog(val, index) {
      this.$refs.moduleDialog.open(val, index);
    },
    editModule(data) {
      this.moduleList[data.moduleIndex].name = data.name;
    },
    expandCollapseModule(item) {
      const i = item;
      i.open = !i.open;
    },
    cloneHandle(field) {
      this.key += 1;
      return _.cloneDeep({ ...field, key: `${this.key}${new Date().getTime()}` });
    },
  },
};
