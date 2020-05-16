<template>
  <div>
    <condition
      ref="condition"
      @search="search"
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
import middlewares from 'lib/middlewares';
import { role } from 'wrapper/ajax/role';
import aTable from 'components/a-table/index.vue';
import pagination from 'components/pagination/index.vue';
import condition from 'components/condition/index.vue';

export default {
  name: 'system.role.default',
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
          func: { name: 'edit', value: { pathName: 'system.role.edit' } },
        },
        {
          label: '删除',
          type: 'danger',
          func: { name: 'del', value: { apiName: '/api/role', method: 'DELETE' } },
        },
        {
          label: '分配用户',
          func: (data) => {
            console.log(data, '分配用户');
          },
        },
        {
          label: '分配功能',
          func: 123,
        },
        {
          label: '更改状态',
          func: [1, 2, 3],
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    search() {
      this.pagina.current = 1;
      this.init();
    },
    init() {
      this.loading = true;
      const { form } = this.$refs.condition;
      const params = { ...form, size: this.pagina.size, current: this.pagina.current };
      role(params).then((res) => {
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
.role{
  padding: 20px;
  background: white;
}
</style>
