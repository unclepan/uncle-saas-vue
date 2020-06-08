<template>
  <div :class="$style.condition">
    <a-title>
      <slot name="title">筛选条件</slot>
      <template slot="button">
        <span :class="$style['query-time']">距上次查询已过去：{{ past }} 秒</span>
        <el-button v-if="btnShow.reset" size="mini" @click="reset()">重置</el-button>
        <el-button v-if="btnShow.search" @click="search()" type="primary" icon="el-icon-search" size="mini">搜索</el-button>
        <el-button v-if="btnShow.add" @click="add()" size="mini" type="primary">新增</el-button>
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
import { getPropArray, getPropObject } from 'lib/vue-prop';
import condition from './index';

export default {
  props: {
    condList: getPropArray(),
    btn: getPropObject(),
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
  computed: {
    btnShow() {
      const b = { reset: true, search: true, add: true };
      _.merge(b, this.btn);
      return b;
    },
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
        this.past = Math.round((Date.now() - this.time) / 1000);
      }, 1000);
    },
    rTime() {
      this.time = Date.now();
      this.past = Math.round((Date.now() - this.time) / 1000);
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
    add() {
      this.$emit('add');
    },
  },
};
</script>
<style lang="scss" module>
  .condition{
    padding: 13px;
    background: white;
    margin-bottom: 10px;
    .query-time {
      font-size: 12px;
      padding-right: 20px;
      color: #999999;
    }
  }
</style>
