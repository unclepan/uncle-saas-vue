<template>
  <div class="content">
    <!-- <h1>{{ msg }}</h1> -->
    <h1>多人实时在线聊天</h1>
    <p>当前在线人数：{{userNmber}}</p>
    <input type="请输入内容" v-model="inValue" @keyup.enter="btn_sbmit">
    <input type="button" value="发送" @click="btn_sbmit">
    <ul>
      <!-- 最新加入 -->
      <li v-if="newUser">有新人加入</li>
      <li v-for="(item,index) in speak" :key="index" :class="{active:item.name == userStorage}">
        <span>
          <font v-if="item.name == userStorage">：</font>
          {{item.name}}
          <font v-if="item.name != userStorage">：</font>
        </span>
        {{item.msg}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      speak: [], // 聊天记录
      inValue: '', // 当前输入信息
      userIp: '未知用户',
      userStorage: localStorage.getItem('userId'),
      newUser: false, // 是否有新人加入
      userNmber: 0, // 在线人数
    };
  },
  // created() {
  //   fetch(process.env.VUE_APP_BASE_API)
  //     .then((response) => response.json())
  //     .then((myJson) => {
  //       console.log(myJson);
  //     });
  // },
  mounted() {
    this.$socket.emit('connect', 1);
    console.log(this.userStorage);
  },
  methods: {
    // 提交向后端发送数据
    btn_sbmit() {
      if (!localStorage.getItem('userId')) {
        this.userIp = this.formatDateTime() + Math.random().toString(36).substr(2);
        this.speak.push({ name: this.userIp.substr(-5, 5), msg: this.inValue });
        this.$socket.emit('send', { name: `用户${this.userIp.substr(-5, 5)}`, getMsg: this.inValue });
        localStorage.setItem('userId', `用户${this.userIp.substr(-5, 5)}`);
        this.userStorage = localStorage.getItem('userId');
      } else {
        this.speak.push({ name: localStorage.getItem('userId'), msg: this.inValue });
        this.$socket.emit('send', { name: localStorage.getItem('userId'), getMsg: this.inValue });
      }
      this.inValue = '';
    },
    // 生成id
    formatDateTime() {
      const date = new Date();
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? (`0${m}`) : m;
      let d = date.getDate();
      d = d < 10 ? (`0${d}`) : d;
      const h = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return y + m + d + h + minute + second;
    },
  },
  sockets: {
    connect(data) {
      if (data) {
        console.log('连接成功', data);
        this.$socket.emit('users');
      }
    },
    users(data) {
      console.log('在线人数', data);
      this.userNmber = data;
    },
    reconnect(data) {
      console.log('重新连接', data);
    },
    disconnecting(data) {
      console.log(data);
      console.log('socket已断开连接');
      this.$socket.emit('users');
    },
    // 有新人加入
    // userinfoNumber(data){
    //   this.userNmber = true;
    // },
    getMsg(data) {
      console.log('后端传过来的消息', data);
      this.speak = data;
    },
  },
};
</script>
