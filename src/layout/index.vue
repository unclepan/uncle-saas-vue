<template>
  <div :class="$style.layout" v-if="isShow">
    <sidebar :menuList='menuList'/>
    <div :class="$style['main-container']" :style="{paddingLeft: isCollapse ? '64px': '200px', minWidth: '960px'}">
      <navbar @logout="logout" @personal="personal"/>
      <tags-view id="handler-tags-view" @refresh="reloadView"/>
      <app-main ref="appMain"/>
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
        this.menuList = menus.concat(res.data.menus);

        this.$nextTick(() => {
          this.$i18n.mergeLocaleMessage('en-US', {
            m: { far: res.data.en },
          });
          this.$i18n.mergeLocaleMessage('zh-CN', {
            m: { far: res.data.zh },
          });
        });

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
      const stl = await message.confirm('确认登出？');
      if (stl) {
        logout().then(() => {
          localStorage.removeItem('userToken');
          this.$router.push({ path: '/login' });
        });
      }
    },
    personal() {
      this.$router.push({ path: '/personal' });
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
