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
      <div :class="$style['custom-tree-node']" slot-scope="{ node, data }">
        <div :class="$style.node">
          <div :class="$style.item">
            <span :class="$style.lable">名称: </span>
            {{ data.name }}
          </div>
          <div :class="$style.item">
            <span :class="$style.lable">类型: </span>
            {{data.type}}
          </div>
          <div :class="$style.item">
            <span :class="$style.lable">状态: </span>
            <i :class="data.state ? 'el-icon-success' : 'el-icon-remove'" :style="{color: data.state ? 'green' : 'red' }"></i>
          </div>
        </div>
      </div>
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
    border: 1px solid #f0f0f0;
    :global(.el-tree-node__content){
      height: 42px;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: -1px;
    }
  }
  .custom-tree-node{
    width: 100%;
    padding-right: 20px;
    .node{
      display: flex;
      justify-content: space-between;
      .item{
        .lable{
          color: #999999;
          padding-right: 8px;
        }
      }
    }
  }
}
</style>
