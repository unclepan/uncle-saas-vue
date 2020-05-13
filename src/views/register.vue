<template>
  <div :class="$style.register">
    <div :class="$style.in18">
      <in18></in18>
    </div>
    <div :class="$style.main">
      <div :class="$style.form">
        <img :class="$style.logo" src="~/assets/images/logo-03.png"/>
        <h2 :class="$style.title">{{$t('m.register.started')}}</h2>
        <p :class="$style.text">{{$t('m.register.continue')}}</p>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules">

          <el-form-item prop="name">
            <el-input
              :placeholder="$t('m.register.rulesName')"
              v-model="ruleForm.name"
              suffix-icon="el-icon-user" />
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              :placeholder="$t('m.register.rulesEmail')"
              v-model="ruleForm.email"
              suffix-icon="el-icon-message" />
            <el-button @click="sendCode" size="mini" type="primary" plain>{{$t('m.register.sendCode')}}</el-button>
            <span :class="$style.status">{{ statusMsg }}</span>
          </el-form-item>

          <el-form-item prop="code">
              <el-input
                :placeholder="$t('m.register.code')"
                v-model="ruleForm.code"
                maxlength="4" />
            </el-form-item>

          <el-form-item prop="password">
            <el-input
              :placeholder="$t('m.register.rulesPassword')"
              v-model="ruleForm.password"
              type="password"
              suffix-icon="el-icon-lock"/>
          </el-form-item>

          <el-form-item>
           <el-checkbox v-model="checked">{{$t('m.register.conditions')}}</el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button @click="register" :class="$style['register-btn']" type="primary">
              {{$t('m.register.sing')}}
            </el-button>
          </el-form-item>
        </el-form>
        <p :class="$style.account">
          {{$t('m.register.account')}}
          <router-link :to="{ path: '/login' }" :class="$style.link">
            {{$t('m.register.login')}}
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import { userVerify, create, usersWhetherName } from 'wrapper/ajax/users';
import in18 from 'components/in18/index.vue';
import message from 'lib/message';

export default {
  components: {
    in18,
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: this.$t('m.register.rulesName'),
            trigger: 'blur',
          },
          {
            validator: async (rule, value, callback) => {
              if (!value) {
                callback(new Error('昵称不能为空'));
              }
              const isUser = await usersWhetherName({ name: value });
              if (isUser.data) {
                callback(new Error('昵称已经被占用'));
              }
            },
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: this.$t('m.register.rulesEmail'),
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: this.$t('m.register.rulesCode'),
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: this.$t('m.register.rulesPassword'),
            trigger: 'blur',
          },
        ],
      };
    },

  },
  data() {
    return {
      timerid: null,
      statusMsg: '',
      checked: false,
      ruleForm: {
        name: '',
        email: '',
        code: '',
        password: '',
      },
    };
  },
  created() {
    window.yangpanLoading.hide();
  },
  mounted() {

  },
  methods: {
    sendCode() {
      if (this.timerid) return;
      this.$refs.ruleForm.validateField(['name', 'email']);
      const { name, email } = this.ruleForm;
      if (name && email) {
        userVerify({ name, email }).then(({ data }) => {
          if (data && data.code === 0) {
            let count = 60;
            this.statusMsg = `验证码已发送，请查看邮箱，剩余${count -= 1}秒`;
            this.timerid = setInterval(() => {
              this.statusMsg = `验证码已发送，请查看邮箱，剩余${count -= 1}秒`;
              if (count === 0) {
                clearInterval(this.timerid);
                this.timerid = null;
                this.statusMsg = '';
              }
            }, 1000);
          } else {
            this.statusMsg = data.msg;
          }
        });
      }
    },
    register() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.checked) {
            const {
              name, email, code, password,
            } = this.ruleForm;
            create({
              name, email, code, password: CryptoJS.MD5(password).toString(),
            }).then(() => {
              this.$router.push({ path: '/login' });
            });
          } else {
            message.error('请勾选同意条件');
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" module>
.register{
  .in18{
    text-align: right;
    float: right;
    margin: 10px;
    padding: 5px;
    border: 1px solid #aaaaaa;
  }
  .main {
    width: 100vw;
    height: calc(100vh - 96px);
    display: flex;
    align-items: center;
    justify-content: center;
    .form{
      width: 520px;
      background: white;
      padding: 3rem;
      :global(.el-input__inner){
        height: 50px;
        line-height: 50px;
      }
      .logo{
        width: 160px;
        padding-bottom: 20px;
      }
      .title{
        font-weight:800;
        color: #000000;
      }
      .text{
        line-height: 21px;
        font-size: 14px;
        padding-bottom: 30px;
        font-weight:300;
      }
      .register-btn{
        width: 100%;
      }
      .account{
        text-align: center;
        .link{
          color: #409EFF;
        }
      }
      .status {
        font-size: 12px;
        margin-left: 20px;
        color: #e6a23c;
      }
    }
  }
}

</style>
