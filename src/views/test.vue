<template>
  <div>
    <uncle-vue-chat :feedList="feedList" :author="author"/>
  </div>
</template>


<script>
import uncleVueChat from 'uncle-vue-chat';

export default {
  name: 'test',
  data() {
    return {
      feedList: [
        {
          key: 0,
          id: 0,
          author: 'Person',
          contents: 'hi there',
          date: '16:30',
          type: 'message',
        },
      ],
      author: 1,
    };
  },
  components: {
    uncleVueChat,
  },
  mounted() {

  },
  methods: {
  },
};
</script>
<style lang="scss" module>
</style>
