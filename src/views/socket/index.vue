<template>
  <div :class="$style.socket">
    <div :span="16" :class="$style.left">
      <div :class="$style.head">
        <h4>多人实时在线聊天</h4>
      </div>

      <div :class="$style.chat">
        <vue-scroll :ops='ops' ref="vs">
          <template v-for="(item, index) in speakList">
            <div :id="`d${index}`" v-if="item.user._id === userInfo._id" :class="[$style.item ,$style.me]" :key="index">
              <div :class="$style.text">{{item.msg}}</div>
              <el-avatar :src="`${baseApi}${item.user.avatar}`"></el-avatar>
            </div>

            <div :id="`d${index}`" v-else :class="$style.item" :key="index">
              <el-avatar :src="`${baseApi}${item.user.avatar}`"></el-avatar>
              <div :class="$style.text">{{item.msg}}</div>
            </div>
          </template>
        </vue-scroll>
      </div>


      <div :class="$style.input">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="inValue"
          maxlength="30"
          show-word-limit
          >
        </el-input>

        <div :class="$style.button">
          <el-button :disabled="!inValue" type="primary" size="small" @click="submit">发送</el-button>
        </div>
      </div>
    </div>

    <div :span="8" :class="$style.right">
      <div :class="$style.head">
        <el-input
          size="small"
          placeholder="当前在线"
          prefix-icon="el-icon-search"
          v-model="search">
        </el-input>
      </div>

      <div :class="$style['on-line']">
        <vue-scroll :ops='ops'>
          <div :class="$style.item" v-for="(item, index) in onLine" :key="index">
            <el-avatar size="small" :src="`${baseApi}${item.avatar}`"></el-avatar>
            <div :class="$style.info">
              <h4 :class="$style.name">{{item.name}}</h4>
              <p :class="$style.text">{{item.introduce}}</p>
            </div>
          </div>
        </vue-scroll>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'socket',
  computed: {
    ...mapState('user', ['userInfo']),
  },
  data() {
    return {
      baseApi: process.env.VUE_APP_BASE_API,
      search: '',
      speakList: [], // 聊天记录
      inValue: '', // 当前输入信息
      onLine: {}, // 当前在线用户
      ops: {
        scrollPanel: {
          scrollingX: false,
        },
        bar: {
          background: '#aaaaaa',
          onlyShowBarOnScroll: true,
          opacity: 0.2,
        },
      },
    };
  },
  mounted() {
    this.$socket.emit('connect', true);
  },
  methods: {
    // 提交向后端发送数据
    submit() {
      const { _id: id } = this.userInfo;
      this.$socket.emit('send', { user: id, getMsg: this.inValue });
      this.inValue = '';
    },
  },
  sockets: {
    connect(data) {
      if (data) { // 连接成功
        this.$socket.emit('users', this.userInfo);
        this.$socket.emit('one');
      }
    },
    users(data) {
      this.onLine = data;
    },
    reconnect(data) {
      console.log('重新连接', data);
    },
    disconnecting() {
      this.$socket.emit('discUsers', this.userInfo);
    },
    getMsg(data) {
      this.speakList = data;
      this.$nextTick(() => {
        this.$refs.vs.scrollIntoView(`#d${this.speakList.length - 1}`, 500);
      });
    },
  },
  destroyed() {
    debugger;
  },
};
</script>

<style lang="scss" module>
.socket {
  padding: 13px;
  background: white;
  display: flex;
  .left{
    border: 1px solid #f0f0f0;
    width: 70%;
    .head {
      background: #f3f3f3;
      text-align: center;
      padding: 10px;
      h4{
        padding: 0;
        line-height: 32px;
      }
    }
    .chat{
      height: calc(100vh - 295px);
      .item{
        display: flex;
        align-items: center;
        padding: 10px;
        justify-content: flex-start;
        .text{
          background: #f7f7f7;
          color: #666666;
          font-size: 12px;
          line-height: 16px;
          padding: 10px;
          margin-left: 10px;
          border-radius: 10px;
          max-width: 70%;
        }
      }
      .me{
        justify-content: flex-end;
        .text{
          margin: 0;
          margin-right: 10px;
          background: #e9f1f5;
        }
      }
    }
    .input{
      border-top: 1px solid #f0f0f0;
      padding: 20px 10px;
      display: flex;
      .button{
        padding-left: 10px;
      }
    }
  }
  .right{
    border: 1px solid #f0f0f0;
    border-left: 0;
    width: 30%;
    .head {
      background: #f3f3f3;
      text-align: center;
      padding: 10px;
    }
    .on-line{
      height: calc(100vh - 200px);
      .item{
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #f0f0f0;
        margin-bottom: -1px;
        .info{
          padding-left: 10px;
          .name{
            padding: 0;
          }
          .text{
            font-size: 12px;
            color: #999999;
            padding-top: 4px;
          }
        }
        &:hover{
          background: #e9f1f5;
        }

      }
    }
  }
}
</style>
