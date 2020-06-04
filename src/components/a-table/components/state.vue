<template>
  <i :class="state ? 'el-icon-success' : 'el-icon-remove'" :style="{color:state ? '#67C23A' : '#F56C6C' }"></i>
</template>

<script>
import { getPropObject } from 'lib/vue-prop';

export default {
  props: {
    row: getPropObject(),
    column: getPropObject(),
  },
  data() {
    return {
      state: this.row[this.column.prop],
    };
  },
};
</script>
<style lang="scss" module>
</style>
