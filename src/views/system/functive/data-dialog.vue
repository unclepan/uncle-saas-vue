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
import message from 'lib/message';
import dialog from 'components/dialog/index.vue';
import aForm from 'components/dynamic-form-fields/form/index.vue';
import {
  post,
  patch,
} from 'wrapper/ajax/functive';

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
          name: 'link',
          value: '',
          label: '链接地址',
          type: 'TEXT',
          rules: [],
          meta: {
            placeholder: '请填写内容',
          },
        },
        {
          name: 'icon',
          value: '',
          label: '图标',
          type: 'TEXT',
          rules: [],
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
          },
        },
        {
          name: 'sort',
          value: '',
          label: '排序',
          type: 'NUMBER',
          rules: [
            { type: 'number', message: '排序号必须为数字值' },
          ],
          meta: {
            placeholder: '请填写内容',
          },
        },
        {
          name: 'type',
          value: '',
          label: '功能类型',
          type: 'SELECT',
          rules: [
            { required: true, message: '请填写选项英文名称', trigger: 'blur' },
          ],
          meta: {
            placeholder: '请选择类型',
          },
          options: (cb) => {
            const res = {
              data: [{ name: '菜单', value: 'menu' }, { name: '操作', value: 'handle' }],
            };
            cb(res);
          },
        },
        {
          name: 'state',
          value: '',
          label: '状态',
          type: 'RADIO',
          rules: [
            { required: true, message: '请填写选项英文名称', trigger: 'blur' },
          ],
          meta: {
          },
          options: [{ name: '启用', value: true }, { name: '关闭启用', value: false }],
        },
      ];
      if (val.type === 'edit') {
        this.formRender = formRender.map((item) => ({ ...item, value: val.data[item.name] }));
      } else {
        this.formRender = formRender.map((item) => ({ ...item, value: '' }));
      }
      this.editPrivateData = val.data;
      this.$refs.dialog.dialogVisible = true;
    },
    async opera(val) {
      if (this.type === 'add') {
        const { _id: id } = this.editPrivateData;
        await post({ ...val, parent: id }).then(() => {
          message.success('选项新增成功');
        });
      } else if (this.type === 'edit') {
        const { _id: id } = this.editPrivateData;
        await patch(val, id).then(() => {
          message.success('选项编辑成功');
        });
      }
      this.$refs.dialog.dialogVisible = false;
      this.$emit('success');
    },
  },
};
</script>
<style lang="scss" module>

</style>
