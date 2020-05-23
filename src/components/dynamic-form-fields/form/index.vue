<template>
  <div :class="$style['dynamic-form']">
    <el-form
      :inline="true"
      :model="ruleForm"
      ref="ruleForm"
      label-position="top">
      <!-- 有布局 -->
      <el-row :gutter="16" v-if="card == 1">
        <template v-for="(item, index) in formRender" >
          <el-col :class="$style.col" :xs="12" :sm="8" :lg="6" :key="index" v-if="!item.hide">
            <el-card :class="$style.card" shadow="hover" :body-style="{ padding: '0', height: '150px'}">
              <vue-scroll :ops='ops'>
                <div :style="{padding: '12px'}">
                  <component
                    :key="item.name"
                    :class="$style.block"
                    v-model="ruleForm[`${item.name}`]"
                    :param="item"
                    v-bind:is="getKey(item.type)"
                    :fieldEmitter="fieldEmitter"
                    @fielsChange="(val)=>$emit('fielsChange', val)">
                  </component>
                </div>
              </vue-scroll>
            </el-card>
          </el-col>
        </template>
      </el-row>
      <!-- 无布局 -->
      <template v-else-if="card == 2">
        <template v-for="(item) in formRender">
        <component
          v-if="!item.hide"
          :key="item.name"
          :class="$style.block"
          v-model="ruleForm[`${item.name}`]"
          :param="item"
          v-bind:is="getKey(item.type)"
          :fieldEmitter="fieldEmitter"
          @fielsChange="(val)=>$emit('fielsChange', val)">
        </component>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
import { getPropArray, getPropNumber } from 'lib/vue-prop';
import message from 'lib/message';
import EventEmitter from 'wolfy87-eventemitter';
import field from '../index';

export default {
  props: {
    formRender: getPropArray(),
    card: getPropNumber(1),
  },
  data() {
    const ruleForm = {};
    this.formRender.forEach((item) => {
      ruleForm[item.name] = item.value;
    });
    return {
      ruleForm,
      fieldEmitter: new EventEmitter(),
      ops: {
        scrollPanel: {
          scrollingX: false,
        },
        bar: {
          background: '#aaaaaa',
          onlyShowBarOnScroll: true,
          opacity: 0.2,
        },
      },
    };
  },
  components: {
    ...field,
  },
  methods: {
    getKey(data) {
      const origin = data.toUpperCase();
      return `A-${origin}`;
    },
    submitForm(formName, cb, catchCb = () => {}) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          cb(this.ruleForm);
          return true;
        }
        catchCb();
        message.error('提交错误，请检查验证规则');
        return false;
      });
    },
  },
  beforeDestroy() {
    this.fieldEmitter = null;
  },
};
</script>

<style lang="scss" module>
.dynamic-form{
  .col{
    padding: 8px 0;
    .card{
      border: 1px dashed #f0f0f0;
      background: #fefefe;
    }
  }
  .block{
    width: 100%;
  }
}
</style>
