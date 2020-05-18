<template>
  <div :class="$style['option-value']">
    <data-dialog
      ref="dataDialog"
      @success="init"/>

    <a-title>
      选项值
      <template slot="button">
        <el-button size="mini" @click="cancel">返回选项列表</el-button>
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
import middlewares from 'lib/middlewares';
import aTitle from 'components/a-title.vue';
import aTable from 'components/a-table/index.vue';
import pagination from 'components/pagination/index.vue';
import { optionValue } from 'wrapper/ajax/option';

import dataDialog from './data-dialog.vue';

export default {
  name: 'system.option.value',
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
            label: '选项值名称',
            width: '180',
            fixed: 'left',
            align: 'left',
          },
          {
            prop: 'ename',
            label: '选项值英文名称',
            width: '180',
          },
          {
            prop: 'value',
            label: '选项值',
          },
          {
            prop: 'description',
            label: '描述',
            'min-width': '180',
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
          func: { name: 'del', value: { apiName: '/api/option/value/delete', method: 'DELETE' } },
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
      const { id } = this.$route.params;
      const params = { size: this.pagina.size, current: this.pagina.current };
      optionValue(params, id).then((res) => {
        const {
          count, current, data, size,
        } = res.data;
        this.tableData.row = data;
        this.tableData.operation = middlewares.tableOperationInit(this.operation, this);
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
    cancel() {
      this.$router.push({ name: 'system.option.default' });
    },
  },
};
</script>
<style lang="scss" module>
.option-value{
  background: #ffffff;
  padding: 16px;
}
</style>
