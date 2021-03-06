<template>
  <div :class="$style.personal" v-loading="!loadingUserInfo">
    <a-title>个人资料编辑</a-title>

    <div :class="$style.header">
      <avatar
        v-if="loadingUserInfo"
        @reset="resetUserInfo()"
        :avatar="userInfo.avatar ? `${baseApi}${userInfo.avatar}`: ''"
        :userId="userInfo._id"/>
      <div :class="$style.info">
        <h2>{{userInfo.name}}</h2>
        <p>{{userInfo.introduce}}</p>
      </div>
    </div>

    <div :class="$style.from">
      <x-form
        v-if="formRender"
        ref="xForm"
        :formRender="formRender"
        :card='2' />
      <el-button type="primary" @click="onSubmit()">确认更新资料</el-button>
    </div>

  </div>
</template>

<script>
import xForm from 'components/dynamic-form-fields/form/index.vue';
import aTitle from 'components/a-title.vue';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import { mapState, mapMutations } from 'vuex';
import { userInfo, patch, logout } from 'wrapper/ajax/users';
import avatar from './avatar.vue';

export default {
  name: 'personal',
  components: {
    xForm,
    aTitle,
    avatar,
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
  data() {
    return {
      loadingUserInfo: true,
      baseApi: process.env.VUE_APP_BASE_API,
      formRender: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const formRender = [
        {
          name: 'name',
          value: '',
          label: '姓名',
          type: 'TEXT',
          rules: [],
          describe: '姓名不支持重名',
          meta: {
            placeholder: '请填写内容',
          },
        },
        {
          name: 'email',
          value: '',
          label: '邮箱',
          type: 'TEXT',
          rules: [],
          describe: '邮箱不支持更改，如果您坚持，建议请您放弃此账号，重新注册。',
          meta: {
            placeholder: '请填写内容',
            disabled: true,
          },
        },
        {
          name: 'password',
          value: '',
          label: '密码',
          type: 'TEXT',
          rules: [],
          describe: '注意：您如需更改密码，请填写，否则请勿填写，如果您改了，那么请您牢记您改了什么。',
          meta: {
            placeholder: '请填写内容',
          },
        },
        {
          name: 'birth',
          value: '',
          label: '出生日期',
          type: 'DATETIME',
          rules: [],
          meta: {
            placeholder: '请填写内容',
          },
        },
        {
          name: 'introduce',
          value: '',
          label: '简介',
          type: 'TEXTAREA',
          rules: [],
          meta: {
            placeholder: '请填写内容',
            type: 'textarea',
          },
        },
        {
          name: 'gender',
          value: '',
          label: '性别',
          type: 'RADIO',
          rules: [],
          meta: {
            size: 'small',
          },
          options: [{ name: '男', value: 'male' }, { name: '女', value: 'female' }],
        },
      ];
      this.formRender = formRender.map((item) => ({ ...item, value: this.userInfo[item.name] || '' }));
    },
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
    onSubmit() {
      this.$refs.xForm.submitForm('ruleForm', (val) => {
        const data = { ...val };
        if (data.password) {
          data.password = CryptoJS.MD5(data.password).toString();
        } else {
          delete data.password;
        }
        if (data.birth) {
          data.birth = moment(data.birth).format('YYYY-MM-DD HH:mm:ss');
        } else {
          delete data.birth;
        }
        const { _id: userId } = this.userInfo;
        patch(data, userId).then(() => {
          logout().then(() => {
            localStorage.removeItem('userToken');
            this.$router.push({ path: '/login' });
          });
        });
      });
    },
  },
};
</script>

<style lang="scss" module>
.personal{
  padding: 13px;
  background: white;
  .header{
    display: flex;
    width: 520px;
    .info{
      padding-left: 30px;
      h2{
        padding: 0;
        color: #000000;
        font-weight: 900;
      }
      p{
        padding-top: 10px;
      }
    }
  }
  .from{
    width: 520px;
    padding: 30px 0;
  }
}
</style>
