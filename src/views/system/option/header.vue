<template>
<div>
  <data-dialog
    ref="dialog"
    @success="success"/>
  <a-title>
    选项管理
      <span slot="button">
      <el-button
        @click="add()"
        type="primary"
        icon="el-icon-plus"
        size="mini">
        新增
      </el-button>
    </span>
  </a-title>
</div>

</template>

<script>
import aTitle from 'components/a-title.vue';
import dataDialog from './data-dialog.vue';

export default {
  components: {
    aTitle,
    dataDialog,
  },
  methods: {
    add() {
      this.$refs.dialog.open({ type: 'add', title: '新增选项' });
    },
    success() {
      this.$emit('success');
    },
  },
};
</script>
<style lang="scss" module>
</style>
