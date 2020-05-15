<template>
  <i :class="state ? 'el-icon-success' : 'el-icon-remove'" :style="{color:state ? 'green' : 'red' }"></i>
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
