<template>
  <container :param="param">
    <el-upload
      :class="$style.upload"
      ref="upload"
      v-if="editingStatus"
      v-bind="param.meta"
      :headers="{
        Authorization
      }"
      :action="`${baseApi}/api/file/upload`"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :on-error="handleError"
      :before-remove="handleBeforeRemove"
      :before-upload="beforeUpload"
      :auto-upload="false"
      :limit="1">
        <el-button slot="trigger" size="small" type="primary" icon="el-icon-upload">选取</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
    </el-upload>
    <span v-else>{{value || '字段无值'}}</span>
  </container>
</template>

<script>
import message from 'lib/message';
import fieldMixin from './basic/field-mixin';

export default {
  INDEX: ['UPLOAD'],
  mixins: [
    fieldMixin,
  ],
  data() {
    return {
      baseApi: process.env.VUE_APP_BASE_API,
      Authorization: localStorage.getItem('userToken'),
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('文件不能超过 2MB!');
      }
      return isLt2M;
    },
    handleBeforeRemove() {
      this.value = '';
    },
    handleError() {
      message.error('上传失败');
    },
    handleExceed() {
      message.error('只允许一个文件，请移除当前文件后再次选');
    },
    handleSuccess(res) {
      if (res) {
        this.value = res.basename;
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    },
  },
};
</script>

<style lang="scss" module>
.upload{
  :global(.el-upload-list__item-name){
    padding-left: 0;
  }
}
</style>
