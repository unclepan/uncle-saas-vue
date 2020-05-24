<template>
  <operation v-if="editData" type="edit" :editData="editData"/>
</template>

<script>
import { getModuleGeneralById } from 'wrapper/ajax/module';
import operation from './operation.vue';

export default {
  name: 'module.edit',
  components: {
    operation,
  },
  data() {
    return {
      editData: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const { id, vid } = this.$route.params;
      getModuleGeneralById(id, vid).then((res) => {
        this.editData = res.data;
      });
    },
  },
};
</script>
