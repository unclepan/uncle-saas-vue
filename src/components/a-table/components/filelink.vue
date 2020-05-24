<template>
  <div>
    <a :href="`${baseApi}${link}`" :download="link">{{link}}</a>
  </div>
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
      link: this.row[this.column.prop],
      baseApi: process.env.VUE_APP_BASE_API,
    };
  },
};
</script>
<style lang="scss" module>
</style>
