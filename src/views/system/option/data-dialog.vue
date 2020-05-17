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
import message from 'lib/message';
import dialog from 'components/dialog/index.vue';
import xForm from 'components/dynamic-form-fields/form/index.vue';
import {
  post,
  patch,
} from 'wrapper/ajax/option';

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
          rules: [
            { required: true, message: '请填写选项英文名称', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (/[\u4e00-\u9fa5]/.test(value)) {
                  callback(new Error('不能包含中文，请正确填写'));
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
          rules: [],
          meta: {
            placeholder: '请填写内容',
            type: 'textarea',
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
    opera(val) {
      if (this.type === 'add') {
        post(val).then(() => {
          message.success('选项新增成功');
          this.$refs.dialog.dialogVisible = false;
          this.$emit('success');
        });
      } else if (this.type === 'edit') {
        const { _id: id } = this.editPrivateData;
        patch(val, id).then(() => {
          message.success('选项编辑成功');
          this.$refs.dialog.dialogVisible = false;
          this.$emit('success');
        });
      }
    },
    add() {
      // optionAdd(data).then((res) => {
      //   message.success(res.message);
      //   this.$refs.dialog.dialogVisible = false;
      //   this.$emit('success');
      // });
    },
    edit() {
      // const { id } = this.editPrivateData;
      // optionEdit({ id, ...data }).then((res) => {
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
