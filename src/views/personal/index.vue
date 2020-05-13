<template>
  <div :class="$style.personal">
    <avatar :avatar="`${baseApi}${userInfo.avatar}`"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import avatar from './avatar.vue';

export default {
  components: {
    avatar,
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
  data() {
    return {
      imageUrl: '',
      baseApi: process.env.VUE_APP_BASE_API,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
  },
};
</script>

<style lang="scss" module>
.personal{
  padding: 20px;
  background: white;
}
</style>
