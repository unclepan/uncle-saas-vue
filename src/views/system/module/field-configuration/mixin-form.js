export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!(/^[a-z]+$/i).test(value)) {
                callback(new Error('非英文，请正确填写'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
          {
            min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur',
          },
        ],
        label: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur',
          },
        ],
        options: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
      },
    };
  },
  watch: {
    editMeta: {
      handler(val) {
        const meta = val.reduce((obj, item) => {
          const o = obj;
          if (item.key && item.value) {
            o[item.key] = item.value;
          }
          return o;
        }, {});
        if (this.editField) {
          this.editField.meta = meta;
        }
      },
      deep: true,
    },
  },
  methods: {
    fieldValidate() {
      return new Promise((resolve) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },
    addFieldMeta() {
      this.editMeta.push({
        key: '',
        value: '',
      });
    },
    removeFieldMeta() {
      this.editMeta.splice(-1, 1);
    },
    handleRequiredState() {
      this.editField.rules = this.editField.rules.filter((item) => !item.required);
      if (this.requiredState) {
        this.editField.rules = this.editField.rules.concat({ required: true, message: '这是必填字段', trigger: 'blur' });
      }
    },
    openFormEventDialog(val) {
      this.$refs.formEventDialog.open(val);
    },
    editFormEvent(val) {
      this.editField.event = val;
    },
  },
};
