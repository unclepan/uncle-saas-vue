<template>
  <a-dialog
    title="给角色分配用户"
    ref="dialog"
    width="622px"
    :footer="false">
      <el-transfer
        v-model="value"
        :data="data"
        filterable
        :titles="['未分配用户','已分配用户']"
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
import { getRoleBindUser, addRoleBindUser, removeRoleBindUser } from 'wrapper/ajax/role';
import { optionSelect } from 'wrapper/ajax/option';
import dialog from 'components/dialog/index.vue';

export default {
  data() {
    return {
      roleId: '',
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
      optionSelect('users').then((res) => {
        this.data = res.data;
      });
    },
    open(val) {
      const { _id: id } = val;
      this.roleId = id;
      getRoleBindUser(this.roleId).then((res) => {
        this.value = res.data.map((item) => item.user);
        this.$refs.dialog.dialogVisible = true;
      });
    },
    handleChange(value, direction, movedKeys) {
      if (direction === 'left') {
        removeRoleBindUser(this.roleId, { users: movedKeys }).then(() => {
          message.success('取消分配成功');
        });
      } else if (direction === 'right') {
        addRoleBindUser(this.roleId, { users: movedKeys }).then(() => {
          message.success('分配用户成功');
        });
      }
    },
  },
};
</script>
