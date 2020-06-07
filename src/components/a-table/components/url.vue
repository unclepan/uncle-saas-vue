<template>
  <div :class="$style.url">
    <i class="el-icon-link"></i>
    <a v-if="url" :href="url" target="_blank">{{url | substr(18)}}</a>
    <span v-else>链接为空</span>
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
    color: #409EFF;
    padding-right: 6px;
  }
  a{
    color: #409EFF;
    white-space:nowrap;
  }
}
</style>
