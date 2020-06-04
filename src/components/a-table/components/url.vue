<template>
  <div :class="$style.url">
    <a v-if="url" :href="`${baseApi}${url}`" :download="url">{{url}}</a>
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
      url: this.row[this.column.prop],
      baseApi: process.env.VUE_APP_BASE_API,
    };
  },
};
</script>
<style lang="scss" module>
.url{
  text-align: left;
  line-height: 30px;
  display: flex;
  align-items: center;
  i{
    font-size: 20px;
    color: #F56C6C;
    padding-right: 6px;
  }
  a{
    color: #409EFF;
    white-space:nowrap;
  }
}
</style>
