<template>
  <a-dialog
    :title="title"
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
import aForm from 'components/dynamic-form-fields/form/index.vue';
import message from 'lib/message';
import dialog from 'components/dialog/index.vue';

import {
  post,
  patch,
} from 'wrapper/ajax/option';

export default {
  data() {
    return {
      title: '提示',
      type: '',
      editPrivateData: {},
      formRender: null,
    };
  },
  components: {
    'a-dialog': dialog,
    aForm,
  },
  methods: {
    open(val) {
      this.title = val.title;
      this.type = val.type;
      const formRender = [
        {
          name: 'name',
          value: '',
          label: '选项名称',
          type: 'TEXT',
          rules: [
            { required: true, message: '请填写选项名称', trigger: 'blur' },
          ],
          meta: {
            placeholder: '请填写内容',
          },
        },
        {
          name: 'ename',
          value: '',
          label: '选项英文名称',
          type: 'TEXT',
          describe: '选项英文名称不能重复',
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
          },
        },
        {
          name: 'description',
          value: '',
          label: '描述',
          type: 'TEXTAREA',
          rules: [
            { required: true, message: '请填写描述', trigger: 'blur' },
          ],
          meta: {
            placeholder: '请填写内容',
          },
        },
      ];
      if (val.type === 'edit') {
        this.formRender = formRender.map((item) => ({ ...item, value: val.data[item.name] }));
        this.editPrivateData = val.data;
      } else {
        this.formRender = formRender.map((item) => ({ ...item, value: '' }));
      }
      this.$refs.dialog.dialogVisible = true;
    },
    async opera(val) {
      if (this.type === 'add') {
        await post(val);
        message.success('选项新增成功');
      } else if (this.type === 'edit') {
        const { _id: id } = this.editPrivateData;
        await patch(val, id);
        message.success('选项编辑成功');
      }
      this.$refs.dialog.dialogVisible = false;
      this.$emit('success');
    },
  },
};
</script>
<style lang="scss" module>

</style>
