<template>
  <div :class="$style.edit">
    <a-title>
      角色编辑
      <template slot="button">
        <el-button size="mini" @click="cancel">返回角色列表</el-button>
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
import middlewares from 'lib/middlewares';
import message from 'lib/message';
import aTitle from 'components/a-title.vue';
import xForm from 'components/dynamic-form-fields/form/index.vue';
import { get, patch } from 'wrapper/ajax/role';

export default {
  name: 'system.role.edit',
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
      let formRender = [
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
          name: 'functive',
          value: '',
          label: '功能项',
          type: 'SELECTMULTIPLE',
          rules: [],
          describe: '功能项涵盖自定义的和动态模块的，动态模块不需要配置，详情请参考功能项管理。',
          meta: {
            placeholder: '请选择功能项',
          },
          options: { name: 'option', value: { apiName: '/api/option/select/functive', method: 'GET' } },
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
      formRender = middlewares.init(formRender, this, 'options');
      const { id } = this.$route.params;
      get(id).then((res) => {
        this.formRender = formRender.map((item) => ({ ...item, value: res.data[item.name] }));
      });
    },
    cancel() {
      this.$router.push({ name: 'system.role.default' });
    },
    onSubmit() {
      this.$refs.xForm.submitForm('ruleForm', (val) => {
        const { id } = this.$route.params;
        patch(val, id).then(() => {
          message.success('编辑成功，请切换到列表页面查看。');
        });
      });
    },
  },
};
</script>

<style lang="scss" module>
.edit{
  padding: 20px;
  background: white;
}
</style>
