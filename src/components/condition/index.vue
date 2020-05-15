<template>
  <div :class="$style.condition">
    <a-title>
      筛选条件
      <template slot="button">
        <el-button size="mini" @click="reset()">重置</el-button>
        <el-button @click="search()" type="primary" icon="el-icon-search" size="mini">搜索</el-button>
      </template>
    </a-title>

    <div>
      <component
        v-for="(item, index) in condList"
        v-model="form[`${item.name}`]"
        :key="index"
        v-bind:is="item.key"
        v-bind="item.meta">
      </component>
    </div>
  </div>
</template>


<script>
import _ from 'lodash';
import aTitle from 'components/a-title.vue';
import { getPropArray } from 'lib/vue-prop';
import condition from './index';

export default {
  props: {
    condList: getPropArray(),
  },
  data() {
    const form = {};
    this.condList.forEach((item) => {
      form[item.name] = item.value;
    });
    const cloneDeepForm = _.cloneDeep(form);
    return {
      form,
      cloneDeepForm,
    };
  },
  components: {
    aTitle,
    ...condition,
  },
  methods: {
    reset() {
      this.form = _.cloneDeep(this.cloneDeepForm);
      this.$emit('search', this.form);
    },
    search() {
      this.$emit('search', this.form);
    },
  },
};
</script>
<style lang="scss" module>
  .condition{
    padding: 20px;
    background: white;
    margin-bottom: 10px;
  }
</style>
