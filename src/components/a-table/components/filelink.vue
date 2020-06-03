<template>
  <div :class="$style.link">
    <i class="icon iconfont" :class="icon(link)"></i>
    <a :href="`${baseApi}${link}`" :download="link">{{link | substr(18, -18)}}</a>
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
  methods: {
    icon(val) {
      if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(val)) {
        return 'iconfile-image-fill';
      }
      if (/\.xl(s[xmb]|t[xm]|am)$/.test(val)) {
        return 'iconfile-excel-fill';
      }
      if (/\.(txt)(\?.*)?$/.test(val)) {
        return 'iconfile-text-fill';
      }
      return 'iconfile-unknown-fill';
    },
  },
};
</script>
<style lang="scss" module>
.link{
  text-align: left;
  line-height: 22px;
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
