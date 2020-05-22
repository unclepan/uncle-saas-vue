<template>
  <a-dialog
    title="高级配置：表单通信"
    ref="dialog"
    @determine="($refs.xForm.submitForm('ruleForm', opera))"
    width="620px">
    <p :class="$style.warning">
      <i class="el-icon-warning"></i>
      表单通信的配置是一个高级功能，如果您是非专业的技术人员，我建议您寻找专业的技术人员来帮您，或者您可以选择放弃这个操作！
    </p>
    <a-form
      v-if="formRender"
      ref="xForm"
      :formRender="formRender"
      :card="2" />
  </a-dialog>
</template>

<script>
import aForm from 'components/dynamic-form-fields/form/index.vue';
import _ from 'lodash';
import dialog from 'components/dialog/index.vue';

export default {
  data() {
    return {
      formRender: null,
    };
  },
  components: {
    'a-dialog': dialog,
    aForm,
  },
  methods: {
    open(val) {
      const copyVal = _.cloneDeep(val);
      const emitValue = copyVal.emit || null;
      const onValue = copyVal.on || null;
      const formRender = [
        {
          name: 'emit',
          value: emitValue,
          label: '事件触发脚本',
          type: 'TEXTAREA',
          rules: [],
          meta: {
            placeholder: '请填写脚本',
            rows: 4,
          },
        },
        {
          name: 'on',
          value: onValue,
          label: '事件监听方法脚本',
          type: 'TEXTAREA',
          rules: [],
          meta: {
            placeholder: '请填写脚本',
            rows: 4,
          },
        },

      ];
      this.formRender = formRender;
      this.$refs.dialog.dialogVisible = true;
    },
    opera(val) {
      this.$refs.dialog.dialogVisible = false;
      this.$emit('success', val);
    },
  },
};
</script>
<style lang="scss" module>
.warning {
  color: #F56C6C;
  padding-bottom: 10px;
}
</style>
