<template>
  <div :class="$style['bind-functive']">
    <a-title>
      绑定功能项
      <template slot="button">
        <el-button size="mini" @click="cancel">返回</el-button>
        <el-button size="mini" type="primary" @click="onSubmit">确定</el-button>
      </template>
    </a-title>

    <el-tree
      v-loading="loading"
      :class="$style.tree"
      show-checkbox
      :data="data"
      node-key="_id"
      :props="defaultProps"
      ref="tree"
      :default-checked-keys="defaultCheckedKeys"
      default-expand-all
      check-strictly>
    </el-tree>
  </div>
</template>

<script>
import aTitle from 'components/a-title.vue';
import message from 'lib/message';
import { tree } from 'wrapper/ajax/functive';
import { getRoleBindFunctive, addRoleBindFunctive } from 'wrapper/ajax/role';


export default {
  name: 'system.role.edit',
  components: {
    aTitle,
  },
  data() {
    return {
      loading: true,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      defaultCheckedKeys: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      const { id } = this.$route.params;
      await getRoleBindFunctive(id).then((res) => {
        this.defaultCheckedKeys = res.data.map((item) => item.functive);
      });
      await tree().then((res) => {
        this.data = res.data;
        this.loading = false;
      });
    },
    cancel() {
      this.$router.push({ name: 'system.role.default' });
    },
    onSubmit() {
      const { id } = this.$route.params;
      const functives = this.$refs.tree.getCheckedKeys();
      addRoleBindFunctive(id, { functives }).then(() => {
        message.success('角色绑定功能编辑成功！');
        this.cancel();
      });
    },

  },
};
</script>

<style lang="scss" module>
.bind-functive{
  padding: 20px;
  background: white;
  .tree{
    :global(.el-tree-node__content){
      height: 42px;
      padding: 10px 0;
    }
  }
}
</style>
