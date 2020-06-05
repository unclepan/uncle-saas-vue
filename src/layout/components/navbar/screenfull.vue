<template>
  <div>
    <i
      class="iconfont icon"
      :class="isFullscreen ? 'iconfullscreen-exit' : 'iconfullscreen'"
      @click="click()">
    </i>
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning',
        });
        return false;
      }
      return screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change);
      }
    },
  },
};
</script>
