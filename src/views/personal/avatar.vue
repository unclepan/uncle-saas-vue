<template>
  <div :class="$style.avatar">
    <el-dialog
      v-if="dialogVisible"
      title="头像编辑"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="620px">
      <div :class="$style['edit-bar']">
        <el-button
          :disabled="!beforeImg"
          size="mini"
          type="primary"
          @click="crop">
          裁剪
        </el-button>

        <el-upload
          :class="$style.upload"
          :action="`${baseApi}/api/file/upload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
        </el-upload>

        <el-button
          @click="confirm"
          size="mini"
          type="primary"
          :disabled="!cropperData">
          确认
        </el-button>

      </div>

      <el-row v-if="beforeImg">
        <el-col :span="16">
          <div :class="$style['img-container']">
            <img :src="beforeImg" ref="image" alt="">
          </div>
        </el-col>
        <el-col :span="8" :class="$style['cropper-img']">
          <div :class="$style.avatar">
            <el-avatar :size="80" :src="afterImg"></el-avatar>
            <p>圆形示例</p>
          </div>
          <div :class="$style.avatar">
            <el-avatar shape="square" :size="80" :src="afterImg"></el-avatar>
            <p>方形示例</p>
          </div>
        </el-col>
      </el-row>

    </el-dialog>
    <el-avatar @click.native="handleEditAvatar" :size="50" :src="avatar"></el-avatar>
  </div>

</template>

<script>
import path from 'path';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import {
  getPropString,
} from 'lib/vue-prop';
import { fileCropAvatar } from 'wrapper/ajax/users';

export default {
  props: {
    avatar: getPropString(),
    userId: getPropString(),
  },
  data() {
    return {
      cropperData: null, // 裁剪位置数据
      changeAvatarRes: null, // 如果新上传这个地方就会有值
      beforeImg: '', // 裁剪的原图
      baseApi: process.env.VUE_APP_BASE_API,
      myCropper: null, // 裁剪实例
      afterImg: '', // 裁剪之后的图
      dialogVisible: false,
    };
  },
  methods: {
    handleEditAvatar() {
      this.cropperData = null;
      this.changeAvatarRes = null;
      this.beforeImg = this.avatar;
      this.myCropper = null;
      this.afterImg = '';
      this.dialogVisible = true;
      this.$nextTick(() => {
        if (this.avatar) {
          this.initCrop();
        }
      });
    },
    initCrop() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false,
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      this.cropperData = null;
      this.afterImg = '';
      this.changeAvatarRes = res;
      this.beforeImg = URL.createObjectURL(file.raw);
      if (this.myCropper) {
        this.myCropper.replace(this.beforeImg);
      } else {
        this.$nextTick(() => {
          this.initCrop();
        });
      }
    },
    crop() {
      this.cropperData = this.myCropper.getData();
      this.afterImg = this.myCropper.getCroppedCanvas({
        imageSmoothingQuality: 'high',
      }).toDataURL('image/jpeg');
    },
    confirm() {
      let basename = { basename: path.basename(this.avatar) };
      let newPic = false;
      if (this.changeAvatarRes) {
        basename = JSON.parse(JSON.stringify(this.changeAvatarRes));
        newPic = true;
      }
      const { cropperData, userId } = this;
      fileCropAvatar({ ...basename, cropperData, newPic }, userId).then(() => {
        this.dialogVisible = false;
        this.$emit('reset');
      });
    },
  },
};
</script>

<style lang="scss" module>
.avatar{
  .edit-bar{
    padding-bottom: 20px;
    .upload{
      display: inline-block;
      padding: 0 10px;
    }
  }
  .img-container{
    height: 360px;
    overflow: hidden;
  }
  .cropper-img{
    text-align: center;
    .avatar{
      padding-bottom: 30px;
    }
  }
}

</style>
