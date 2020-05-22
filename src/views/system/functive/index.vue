<template>
  <div :class="$style.functive">
    <data-dialog
      ref="dataDialog"
      @success="init"/>

    <a-title>
      功能项管理
      <template slot="button">
        <el-button
          @click="add()"
          type="primary"
          icon="el-icon-plus"
          size="mini">
          新增
        </el-button>
      </template>
    </a-title>

    <el-tree
      v-loading="loading"
      :class="$style.tree"
      :data="data"
      node-key="id"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false">
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
        <div>
          <el-button
            v-if="node.level < 5 && data.type !== 'module'"
            size="mini"
            type="primary"
            plain
            @click="() => append(data)">
            新增
          </el-button>
          <el-button
            v-if="data.type !== 'module'"
            size="mini"
            type="primary"
            plain
            @click="() => edit(data)">
            编辑
          </el-button>
          <el-button
            v-if="!node.childNodes.length"
            size="mini"
            type="danger"
            plain
            @click="() => remove(node, data)">
            删除
          </el-button>
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>
import message from 'lib/message';
import aTitle from 'components/a-title.vue';
import { tree, del } from 'wrapper/ajax/functive';
import dataDialog from './data-dialog.vue';

export default {
  name: 'system.functive.default',
  components: {
    aTitle,
    dataDialog,
  },
  data() {
    return {
      loading: true,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    add() {
      this.$refs.dataDialog.open({ type: 'add', title: '新增', data: { _id: 'parent' } });
    },
    init() {
      this.loading = true;
      tree().then((res) => {
        this.data = res.data;
        this.loading = false;
      });
    },
    append(data) {
      this.$refs.dataDialog.open({ type: 'add', title: '新增', data });
    },
    edit(data) {
      this.$refs.dataDialog.open({ type: 'edit', title: '编辑', data });
    },
    async remove(node, data) {
      const stl = await message.confirm('确认删除？');
      if (stl) {
        const { _id: id } = data;
        del(id).then(() => {
          message.success('删除成功');
          this.init();
        });
      }
    },
  },
};
</script>

<style lang="scss" module>
.functive{
  padding: 20px;
  background: white;
  .tree{
    border: 1px solid #f0f0f0;
    :global(.el-tree-node__content){
      height: 48px;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: -1px;
    }
  }
  .custom-tree-node{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 100%;
    padding-right: 20px;
    .node{
      display: flex;
      flex: 1;
      padding-right: 30px;
      .item{
        width: 33.3%;
        max-width: 320px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        .lable{
          color: #999999;
          padding-right: 8px;
        }
      }

    }
  }
}
</style>
