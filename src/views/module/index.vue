<template>
  <div>模块列表页面</div>
</template>

<script>
import { getById } from 'wrapper/ajax/module';

export default {
  data() {
    return {
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const { id } = this.$route.params;
      getById(id).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" module>
</style>
