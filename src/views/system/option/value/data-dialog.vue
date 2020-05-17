<template>
  <x-dialog
    :title="title"
    ref="dialog"
    @determine="($refs.xForm.submitForm('ruleForm', opera))"
    width="520px">
    <x-form
      v-if="formRender"
      ref="xForm"
      :formRender="formRender"
      :card="2" />
  </x-dialog>
</template>

<script>
import dialog from 'components/dialog/index.vue';
import xForm from 'components/dynamic-form-fields/form/index.vue';
// import {
//   optionValueAdd,
//   optionValueEdit,
// } from 'wrapper/ajax/system/option';

export default {
  data() {
    return {
      title: '提示',
      type: 'add',
      editPrivateData: {},
      formRender: null,
    };
  },
  components: {
    'x-dialog': dialog,
    xForm,
  },
  methods: {
    open(val) {
      this.title = val.title;
      this.type = val.type;
      let cName = '';
      let cEname = '';
      let cValue = '';
      let cSortRank = '';

      if (val.type === 'edit') {
        cName = val.data.name;
        cEname = val.data.ename;
        cValue = val.data.value;
        cSortRank = val.data.sortRank;
        this.editPrivateData = val.data;
      }
      this.formRender = [
        {
          name: 'name',
          value: cName,
          label: '选项值名称',
          type: 'TEXT',
          rules: [
            { required: true, message: '请填写选项名称', trigger: 'blur' },
          ],
          meta: {
            placeholder: '请填写内容',
            size: 'small',
          },
        },
        {
          name: 'ename',
          value: cEname,
          label: '选项英文名称',
          type: 'TEXT',
          rules: [
            { required: true, message: '请填写选项英文名称', trigger: 'blur' },
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
          ],
          meta: {
            placeholder: '请填写内容',
            size: 'small',
          },
        },
        {
          name: 'sortRank',
          value: cSortRank,
          label: '排序号',
          type: 'NUMBER',
          rules: [
            { required: true, message: '请填写排序号', trigger: 'blur' },
            { type: 'number', message: '排序号必须为数字值' },
          ],
          meta: {
            placeholder: '请填写内容',
            size: 'small',
          },
        },
        {
          name: 'value',
          value: cValue,
          label: '选项值',
          type: 'TEXT',
          rules: [
            { required: true, message: '请填写选项值', trigger: 'blur' },
          ],
          meta: {
            placeholder: '请填写内容',
            size: 'small',
          },
        },
      ];
      this.$refs.dialog.dialogVisible = true;
    },
    opera() {
      if (this.type === 'add') {
        this.$refs.xForm.submitForm('ruleForm', this.add);
      } else if (this.type === 'edit') {
        this.$refs.xForm.submitForm('ruleForm', this.edit);
      }
    },
    add() {
      // const { id } = this.$route.params;
      // optionValueAdd({ ...data, oid: id }).then((res) => {
      //   message.success(res.message);
      //   this.$refs.dialog.dialogVisible = false;
      //   this.$emit('success');
      // });
    },
    edit() {
      // const { id } = this.editPrivateData;
      // optionValueEdit({ id, ...data }).then((res) => {
      //   message.success(res.message);
      //   this.$refs.dialog.dialogVisible = false;
      //   this.$emit('success');
      // });
    },
  },
};
</script>
<style lang="scss" module>

</style>
