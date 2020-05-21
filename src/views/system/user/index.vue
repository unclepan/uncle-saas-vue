<template>
  <div>
    <bind-role-dialog ref="bindRoleDialog"/>
    <condition
      ref="condition"
      :btn="{ add: false }"
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
import { users } from 'wrapper/ajax/users';
import aTable from 'components/a-table/index.vue';
import pagination from 'components/pagination/index.vue';
import condition from 'components/condition/index.vue';
import bindRoleDialog from './bind-role-dialog.vue';

export default {
  name: 'system.user.default',
  components: {
    bindRoleDialog,
    condition,
    aTable,
    pagination,

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
            label: '用户名称',
          },
        },
        {
          name: 'email',
          key: 'a-input',
          value: '',
          meta: {
            label: '用户邮箱',
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
            label: '用户名称',
            width: '180',
            fixed: 'left',
          },
          {
            prop: 'email',
            label: '邮箱',
            width: '180',
          },
          {
            prop: 'introduce',
            label: '简介',
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
          label: '删除',
          type: 'danger',
          func: { name: 'del', value: { apiName: '/api/users/delete', params: {} } },
        },
        {
          label: '分配角色',
          func: (data) => {
            this.$refs.bindRoleDialog.open(data);
          },
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
      users(params).then((res) => {
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
