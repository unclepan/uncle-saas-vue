<template>
  <div :class="$style.operation">
     <a-title>
      <span>{{moduleInfo.name}}</span>
      <template slot="button">
        <el-button
          size="mini"
          @click="cancel()">
          返回
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="onSubmit()">
          确定
        </el-button>
      </template>
    </a-title>

    <div :class="$style.block" v-for="(item, index) in this.moduleInfo.module" :key="index">
      <div :class="$style.name">
         <i class="el-icon-info"></i>
         <h4>{{item.name}}</h4>
      </div>
      <a-form v-if="item.list" ref="aForm" :formRender="item.list"/>
    </div>

  </div>
</template>

<script>
import aForm from 'components/dynamic-form-fields/form/index.vue';
import aTitle from 'components/a-title.vue';
import middlewares from 'lib/middlewares';
import message from 'lib/message';
import { getGeneralModule, createModuleGeneral, updateModuleGeneral } from 'wrapper/ajax/module';
import { getPropString, getPropObject } from 'lib/vue-prop';

export default {
  props: {
    type: getPropString('add'),
    editData: getPropObject(),
  },
  components: {
    aTitle,
    aForm,
  },
  data() {
    return {
      formRender: null,
      moduleInfo: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    cancel() {
      const { id } = this.$route.params;
      this.$router.push({ name: 'module.list', params: { id } });
    },
    onSubmit() {
      let ruleForm = {};
      let done = true;
      this.$refs.aForm.forEach((item) => {
        item.submitForm('ruleForm', (val) => {
          ruleForm = Object.assign(ruleForm, val);
        }, () => {
          done = false;
        });
      });
      if (done) {
        const { id, vid } = this.$route.params;
        if (this.type === 'edit') {
          updateModuleGeneral(id, vid, ruleForm).then(() => {
            message.success('编辑成功');
          });
        } else {
          createModuleGeneral(id, ruleForm).then(() => {
            message.success('新增成功');
          });
        }
      }
    },
    init() {
      const { id } = this.$route.params;
      getGeneralModule(id).then((res) => {
        const modu = res.data.module.map((item) => {
          let list = item.list.map((i) => {
            const { rules } = i;
            if (i.required) {
              rules.push({ required: true, message: '必填项', trigger: 'blur' });
            }
            let { options } = i;
            if (i.options) {
              options = { name: 'option', value: { apiName: i.options } };
            }
            let { value } = i;
            if (this.type === 'edit') {
              value = this.editData[i.name];
            }
            return {
              ...i, rules, options, value,
            };
          });
          list = middlewares.init(list, this, 'options');
          return { ...item, list };
        });
        this.moduleInfo = { ...res.data, module: modu };
      });
    },
  },
};
</script>

<style lang="scss" module>
.operation{
  padding: 20px;
  background: white;
  .block{
    padding-bottom: 20px;
    .name{
      display: flex;
      align-items: center;
      i{
        padding-right: 5px;
      }
      &:after{
        content:"";
        flex: 1;
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }

}
</style>
