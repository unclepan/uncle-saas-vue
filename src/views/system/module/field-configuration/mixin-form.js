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
            min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur',
          },
        ],
        label: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur',
          },
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
    addFieldMeta() {
      this.editMeta.push({
        key: '',
        value: '',
      });
    },
    removeFieldMeta() {
      this.editMeta.splice(-1, 1);
    },
  },
};
