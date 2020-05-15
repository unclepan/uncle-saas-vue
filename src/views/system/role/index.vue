<template>
  <div>
    <condition
      @search="init"
      :condList="condList"/>
    <div :class="$style.role">
      <a-table
        v-loading="loading"
        :tableData="tableData"/>
      <pagination
        :pagina="pagina"
        :sizeChange="sizeChange"
        :currentChange="currentChange"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { role } from 'wrapper/ajax/role';
import aTable from 'components/a-table/index.vue';
import pagination from 'components/pagination/index.vue';
import condition from 'components/condition/index.vue';

export default {
  name: 'role',
  components: {
    aTable,
    pagination,
    condition,
  },
  data() {
    return {
      loading: true,
      condList: [
        {
          name: 'name',
          key: 'a-input',
          value: '',
          meta: {
            label: '角色名称',
          },
        },
        {
          name: 'state',
          key: 'a-single',
          value: '',
          meta: {
            label: '启用状态',
            optionsFun: () => [
              {
                name: '未启用',
                value: false,
              },
              {
                name: '启用',
                value: true,
              },
            ],
          },
        },
      ],
      pagina: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: {
        column: [
          {
            prop: 'name',
            label: '角色名称',
            width: '180',
            fixed: 'left',
          },
          {
            prop: 'ename',
            label: '英文名',
          },
          {
            prop: 'description',
            label: '描述',
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
            formatter: (row, column, cellValue) => moment(cellValue).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            prop: 'updatedAt',
            label: '更新时间',
            formatter: (row, column, cellValue) => moment(cellValue).format('YYYY-MM-DD HH:mm:ss'),
          },
        ],
        row: [],
        operation: [],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(q = {}) {
      this.loading = true;
      const params = { ...q, size: this.pagina.size, current: this.pagina.current };
      role(params).then((res) => {
        const {
          count, current, data, size,
        } = res.data;
        this.tableData.row = data;
        this.pagina.current = current;
        this.pagina.size = size;
        this.pagina.total = count;
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
.role{
  padding: 20px;
  background: white;
}
</style>
