<template>
  <div :class="$style.personal">
    <avatar
      v-if="loadingUserInfo"
      @reset="resetUserInfo()"
      :avatar="userInfo.avatar ? `${baseApi}${userInfo.avatar}`: ''"
      :userId="userInfo._id"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { userInfo } from 'wrapper/ajax/users';
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
      loadingUserInfo: true,
      baseApi: process.env.VUE_APP_BASE_API,
    };
  },
  methods: {
    ...mapMutations('user', [
      'setUser',
    ]),
    resetUserInfo() {
      this.loadingUserInfo = false;
      userInfo().then((res) => {
        this.setUser(res.data);
        this.$nextTick(() => {
          this.loadingUserInfo = true;
        });
      }).catch(() => {
        this.$router.push({ path: '/login' });
      });
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
