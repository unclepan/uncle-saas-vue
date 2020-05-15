import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import 'normalize.css';
import App from './App.vue';
import router from '../../router';
import store from '../../store';
import '../../registerServiceWorker';
import '@/assets/styles/main.scss';
import 'filter/index'; // 过滤器

import zh from '../../common/lang/zh';
import en from '../../common/lang/en';

Vue.config.productionTip = false;
Vue.use(VueI18n); // 通过插件的形式挂载

const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': zh, // 中文语言包
    'en-US': en, // 英文语言包
  },
});

Vue.use(ElementUI);
Vue.use(vuescroll);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
