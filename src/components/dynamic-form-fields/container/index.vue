<template>
  <el-form-item
    :class="$style.container"
    :prop="`${param.name}`"
    :rules="param.rules">
    <span slot="label" v-if="param.label">
      {{param.label}}
      <el-tooltip placement="top" v-if="param.describe">
        <div slot="content">{{param.describe}}</div>
        <i class="el-icon-question"></i>
      </el-tooltip>
    </span>
    <slot></slot>
  </el-form-item>
</template>

<script>
import { getPropObject } from 'lib/vue-prop';

export default {
  props: {
    param: getPropObject(),
  },
};
</script>

<style lang="scss" module>
.container{
  :global(.el-form-item__label){
    padding: 0 6px;
    line-height: 12px;
    border-left: 2px solid #DCDFE6;
    margin: 6px 0 16px;
  }
}
</style>
