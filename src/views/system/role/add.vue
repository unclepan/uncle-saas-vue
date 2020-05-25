<template>
  <div :class="$style.add">
    <a-title>
      新增角色
      <template slot="button">
        <el-button size="mini" @click="cancel">返回</el-button>
        <el-button size="mini" type="primary" @click="onSubmit">确定</el-button>
      </template>
    </a-title>
    <x-form
      v-if="formRender"
      ref="xForm"
      :formRender="formRender"/>
  </div>
</template>

<script>
import xForm from 'components/dynamic-form-fields/form/index.vue';
import aTitle from 'components/a-title.vue';
import message from 'lib/message';
import { post } from 'wrapper/ajax/role';

export default {
  name: 'system.role.add',
  components: {
    aTitle,
    xForm,
  },
  data() {
    return {
      formRender: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const formRender = [
        {
          name: 'name',
          value: '',
          label: '角色名称',
          type: 'TEXT',
          rules: [
            { required: true, message: '请填写名称', trigger: 'blur' },
          ],
          meta: {
            placeholder: '请填写名称',
          },
        },
        {
          name: 'ename',
          value: '',
          label: '英文名称',
          type: 'TEXT',
          rules: [
            { required: true, message: '请填写英文名称', trigger: 'blur' },
          ],
          meta: {
            placeholder: '请填写名称',
          },
        },
        {
          name: 'state',
          value: false,
          label: '状态',
          type: 'RADIO',
          rules: [],
          meta: {
          },
          options: [{ name: '启用', value: true }, { name: '关闭启用', value: false }],
        },
        {
          name: 'description',
          value: '',
          label: '备注',
          type: 'TEXTAREA',
          rules: [
            { required: true, message: '请填写备注', trigger: 'blur' },
          ],
          meta: {
            placeholder: '请填写备注',
          },
        },
      ];
      this.formRender = formRender;
    },
    cancel() {
      this.$router.push({ name: 'system.role.default' });
    },
    onSubmit() {
      this.$refs.xForm.submitForm('ruleForm', (val) => {
        post(val).then(() => {
          message.success('角色新增成功，请切换到列表页面查看。');
        });
      });
    },
  },
};
</script>

<style lang="scss" module>
.add{
  padding: 20px;
  background: white;
}
</style>
