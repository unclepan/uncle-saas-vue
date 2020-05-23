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
      :limit="1">
        <el-button slot="trigger" size="small" type="primary" icon="el-icon-upload">选取</el-button>
        <el-button v-if="file" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定</el-button>
    </el-upload>
    <span v-else>{{value || '字段无值'}}</span>
  </container>
</template>

<script>
import message from 'lib/message';
import rename from 'wrapper/ajax/common';
import fieldMixin from './basic/field-mixin';

export default {
  INDEX: ['UPLOAD'],
  mixins: [
    fieldMixin,
  ],
  data() {
    return {
      file: '',
      baseApi: process.env.VUE_APP_BASE_API,
      Authorization: localStorage.getItem('userToken'),
    };
  },
  methods: {
    submitUpload() {
      this.value = this.file;
      rename({ folder: 'module', fileName: this.file }).then(() => {
        this.file = '';
      });
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
      this.file = '';
    },
    handleError() {
      message.error('上传失败');
    },
    handleExceed() {
      message.error('只允许一个文件，请移除当前文件后再次选');
    },
    handleSuccess(res) {
      if (res) {
        this.file = res.basename;
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
