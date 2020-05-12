<template>
  <div :class="$style.layout">
    <sidebar :menuList='menuList'/>
    <div :class="$style['main-container']" :style="{paddingLeft: isCollapse ? '64px': '200px', minWidth: '960px'}">
      <navbar @logout="logout"/>
      <tags-view id="handler-tags-view" @refresh="reloadView"/>
      <app-main ref="appMain" v-if="isShow"/>
    </div>
  </div>
</template>

<script>
import message from 'lib/message';
import { mapState, mapMutations } from 'vuex';
import { userInfo, logout } from 'wrapper/ajax/users';
import sidebar from './components/sidebar/index.vue';
import navbar from './components/navbar/index.vue';
import menus from './components/sidebar/menus';
import tagsView from './components/tags-view.vue';
import appMain from './components/app-main.vue';

export default {
  components: {
    sidebar,
    navbar,
    tagsView,
    appMain,
  },
  data() {
    return {
      menuList: [],
      isShow: false,
    };
  },
  computed: {
    ...mapState('app', ['isCollapse']),
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations('user', [
      'setUser',
    ]),
    reloadView() {
      this.$refs.appMain.reload();
    },
    init() {
      userInfo().then((res) => {
        this.setUser(res.data);
        this.isShow = true;
        this.menuList = menus;
        setTimeout(() => {
          this.$nextTick(() => {
            window.yangpanLoading.hide();
          });
        }, 1000);
      }).catch(() => {
        this.$router.push({ path: '/login' });
      });
    },
    async logout() {
      const stl = await message.confirm(this, '确认登出？');
      if (stl) {
        logout().then(() => {
          localStorage.removeItem('userToken');
          this.$router.push({ path: '/login' });
        });
      }
    },
  },
};
</script>

<style lang="scss" module>
.layout{
  .main-container{
    transition: padding-left 300ms;
  }
}
</style>
