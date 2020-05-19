<template>
  <a-dialog
    title="给用户分配角色"
    ref="dialog"
    width="622px"
    :footer="false">
      <el-transfer
        v-model="value"
        :data="data"
        filterable
        :titles="['未分配角色','已分配用户角色']"
        @change="handleChange"
        :props="{
          key: 'value',
          label: 'name'
        }">
      </el-transfer>
  </a-dialog>
</template>

<script>
import message from 'lib/message';
import { getUserBindRole, addUserBindRole, removeUserBindRole } from 'wrapper/ajax/users';
import { optionSelect } from 'wrapper/ajax/option';
import dialog from 'components/dialog/index.vue';

export default {
  data() {
    return {
      userId: '',
      data: [],
      value: [],
    };
  },
  components: {
    'a-dialog': dialog,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      optionSelect('roles').then((res) => {
        this.data = res.data;
      });
    },
    open(val) {
      const { _id: id } = val;
      this.userId = id;
      getUserBindRole(this.userId).then((res) => {
        this.value = res.data.map((item) => item.role);
        this.$refs.dialog.dialogVisible = true;
      });
    },
    handleChange(value, direction, movedKeys) {
      if (direction === 'left') {
        removeUserBindRole(this.userId, { roles: movedKeys }).then(() => {
          message.success('取消分配成功');
        });
      } else if (direction === 'right') {
        addUserBindRole(this.userId, { roles: movedKeys }).then(() => {
          message.success('分配用户成功');
        });
      }
    },
  },
};
</script>
