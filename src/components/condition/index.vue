<template>
  <div :class="$style.condition">
    <a-title>
      筛选条件
      <template slot="button">
        <span :class="$style['query-time']">距上次查询已过去：{{ past }}分钟</span>
        <el-button size="mini" @click="reset()">重置</el-button>
        <el-button @click="search()" type="primary" icon="el-icon-search" size="mini">搜索</el-button>
        <el-button size="mini" type="primary">新增</el-button>
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
      timer: null,
      time: Date.now(),
      past: 0,
    };
  },
  components: {
    aTitle,
    ...condition,
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    init() {
      this.timer = setInterval(() => {
        this.past = Math.round((Date.now() - this.time) / 1000 / 60);
      }, 1000 * 60);
    },
    rTime() {
      this.time = Date.now();
      this.past = Math.round((Date.now() - this.time) / 1000 / 60);
    },
    reset() {
      this.form = _.cloneDeep(this.cloneDeepForm);
      this.$emit('search');
      this.rTime();
    },
    search() {
      this.$emit('search');
      this.rTime();
    },
  },
};
</script>
<style lang="scss" module>
  .condition{
    padding: 20px;
    background: white;
    margin-bottom: 10px;
    .query-time {
      font-size: 12px;
      padding-right: 20px;
      color: #999999;
    }
  }
</style>
