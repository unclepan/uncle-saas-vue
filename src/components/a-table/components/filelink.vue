<template>
  <div :class="$style.link">
    <i class="icon iconfont" :class="icon(link)"></i>
    <a v-if="link" :href="`${baseApi}${link}`" :download="link">{{link | substr(18, -18)}}</a>
    <span v-else>文件内容为空，请上传</span>
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
      if (/\.(png|jpe?g|gif|svg|psd)(\?.*)?$/.test(val)) {
        return 'iconfile-image-fill';
      }
      if (/\.xl(s[xmb]|t[xm]|am)$/.test(val)) {
        return 'iconfile-excel-fill';
      }
      if (/\.(txt|html|css)(\?.*)?$/.test(val)) {
        return 'iconfile-text-fill';
      }
      if (/\.(ppt|pptx)(\?.*)?$/.test(val)) {
        return 'iconfile-ppt-fill';
      }
      if (/\.(doc|docx)(\?.*)?$/.test(val)) {
        return 'iconfile-word-fill';
      }
      if (/\.(pdf)(\?.*)?$/.test(val)) {
        return 'iconfile-pdf-fill';
      }
      if (/\.(zip|rar|arj)(\?.*)?$/.test(val)) {
        return 'iconfile-zip-fill';
      }
      return 'iconfile-unknown-fill';
    },
  },
};
</script>
<style lang="scss" module>
.link{
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
