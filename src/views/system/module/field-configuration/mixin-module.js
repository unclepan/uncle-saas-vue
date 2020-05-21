export default {
  data() {
    return {
      key: 0, // 是可变的，获取值的时候需要设置
      moduleList: [
        {
          name: '新区域一（请改名）',
          open: true,
          list: [],
        },
        {
          name: '新区域二（请改名）',
          open: true,
          list: [],
        },
      ],
    };
  },
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
        const { meta } = this.editField;
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
    editModule(data) {
      this.moduleList[data.moduleIndex].name = data.name;
    },
    openModuleDialog(val, index) {
      this.$refs.moduleDialog.open(val, index);
    },
    expandCollapseModule(item) {
      const i = item;
      i.open = !i.open;
    },
    cloneHandle(field) {
      this.key += 1;
      return { ...field, key: this.key };
    },
  },
};
