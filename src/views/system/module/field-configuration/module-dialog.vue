<template>
  <a-dialog
    title="模块区域改名"
    ref="dialog"
    @determine="($refs.xForm.submitForm('ruleForm', opera))"
    width="520px">
    <a-form
      v-if="formRender"
      ref="xForm"
      :formRender="formRender"
      :card="2" />
  </a-dialog>
</template>

<script>
import dialog from 'components/dialog/index.vue';
import aForm from 'components/dynamic-form-fields/form/index.vue';

export default {
  data() {
    return {
      moduleIndex: undefined,
      formRender: null,
    };
  },
  components: {
    'a-dialog': dialog,
    aForm,
  },
  methods: {
    open(val, index) {
      this.moduleIndex = index;
      const formRender = [
        {
          name: 'name',
          value: val,
          label: '区域名称',
          type: 'TEXT',
          rules: [
            { required: true, message: '请填写区域名称', trigger: 'blur' },
            {
              min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur',
            },
          ],
          meta: {
            placeholder: '请填写内容',
          },
        },
      ];
      this.formRender = formRender;
      this.$refs.dialog.dialogVisible = true;
    },
    opera(val) {
      const { moduleIndex } = this;
      this.$refs.dialog.dialogVisible = false;
      this.$emit('success', { ...val, moduleIndex });
    },
  },
};
</script>
<style lang="scss" module>

</style>
