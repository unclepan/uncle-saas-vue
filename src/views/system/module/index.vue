<template>
  <div :class="$style.module">
    <data-dialog
      ref="dataDialog"
      @success="init"/>

    <a-title>
      模块管理
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

    <a-table
      v-loading="loading"
      :tableData="tableData"/>
    <pagination
      :pagina="pagina"
      :sizeChange="sizeChange"
      :currentChange="currentChange"/>
  </div>
</template>

<script>
import moment from 'moment';
import aTitle from 'components/a-title.vue';
import middlewares from 'lib/middlewares';
import message from 'lib/message';
import aTable from 'components/a-table/index.vue';
import pagination from 'components/pagination/index.vue';
import { getModuleFunctive } from 'wrapper/ajax/module';
import { post as postFunctive } from 'wrapper/ajax/functive';
import dataDialog from './data-dialog.vue';


export default {
  name: 'system.module.default',
  data() {
    return {
      loading: true,
      pagina: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: {
        column: [
          {
            prop: 'name',
            label: '选项名称',
            width: '180',
            fixed: 'left',
            align: 'left',
          },
          {
            prop: 'ename',
            label: '选项英文名称',
            width: '180',
          },
          {
            prop: 'functive',
            label: '是否已推送',
            align: 'center',
            formatter: (row) => (row.functive ? '是' : '否'),
            'min-width': '180',
          },
          {
            prop: 'description',
            label: '描述',
            'min-width': '180',
          },
          {
            prop: 'state',
            label: '启用状态',
            align: 'center',
            components: {
              key: 'state',
            },
          },
          {
            prop: 'createdAt',
            label: '创建时间',
            formatter: (row) => moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            'min-width': '180',
          },
          {
            prop: 'updatedAt',
            label: '更新时间',
            formatter: (row) => moment(row.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
            'min-width': '180',
          },
        ],
        row: [],
        operation: [],
      },
      operation: [
        {
          label: '编辑',
          func: { name: 'dialogEdit', value: {} },
        },
        {
          label: '删除',
          type: 'danger',
          func: { name: 'del', value: { apiName: '/api/module/delete', params: {} } },
        },
        {
          label: '字段配置',
          func: (data) => {
            const { _id: id } = data;
            this.$router.push({ name: 'system.module.field', params: { id } });
          },
        },
        {
          label: '推送功能',
          func: async (data) => {
            const stl = await message.confirm('确认推送此模块到功能项？');
            if (stl) {
              const { name, ename, _id: moduleId } = data;
              postFunctive({
                name,
                ename,
                type: 'menu',
                state: true,
                parent: 'parent',
                moduleId,
                link: `/module/list/${ename}/${moduleId}`,
              }).then(() => {
                message.success('推送成功，请到功能项管理模块查看');
                this.init();
              });
            }
          },
          showBtn: (data) => !data.state || data.functive,
        },
      ],
    };
  },
  components: {
    aTitle,
    aTable,
    pagination,
    dataDialog,
  },
  mounted() {
    this.init();
  },
  methods: {
    add() {
      this.$refs.dataDialog.open({ type: 'add', title: '新增' });
    },
    init() {
      this.loading = true;
      const params = { size: this.pagina.size, current: this.pagina.current };
      getModuleFunctive(params).then((res) => {
        const {
          count, current, data, size,
        } = res.data;
        this.tableData.row = data;
        this.tableData.operation = middlewares.init(this.operation, this);
        const pagina = {
          current,
          size,
          total: count,
        };
        this.pagina = pagina;
        this.loading = false;
      });
    },
    sizeChange(val) {
      this.pagina.size = val;
      this.init();
    },
    currentChange(val) {
      this.pagina.current = val;
      this.init();
    },

  },
};
</script>
<style lang="scss" module>
.module{
  background: #ffffff;
  padding: 13px;
}
</style>
