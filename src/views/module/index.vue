<template>
  <div>
    <condition
      v-if="condList"
      ref="condition"
      @add="add"
      @search="search"
      :condList="condList"/>

    <div :class="$style.module">
      <a-table v-loading="loading" :tableData="tableData"/>
      <pagination :pagina="pagina" :sizeChange="sizeChange" :currentChange="currentChange"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import aTable from 'components/a-table/index.vue';
import pagination from 'components/pagination/index.vue';
import middlewares from 'lib/middlewares';
import condition from 'components/condition/index.vue';
import { formatColumn, formatCondList } from 'components/dynamic-form-fields/fields';
import { getGeneralList } from 'wrapper/ajax/module';

export default {
  name: 'module.list',
  data() {
    return {
      condList: null,
      moduleName: '',
      loading: true,
      pagina: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: {
        column: [],
        row: [],
        operation: [],
        meta: {},
      },
      operation: [
        {
          label: '编辑',
          func: { name: 'forModuleEdit', value: { pathName: 'module.edit' } },
        },
        {
          label: '删除',
          type: 'danger',
          func: { name: 'forModuleDel', value: { apiName: '/api/module/general/delete', params: {} } },
        },
      ],
    };
  },
  components: {
    condition,
    aTable,
    pagination,
  },
  mounted() {
    this.init();
  },
  methods: {
    add() {
      const { ename, id } = this.$route.params;
      this.$router.push({ name: 'module.add', params: { ename, id } });
    },
    search() {
      this.init();
    },
    init() {
      this.loading = true;
      const { id } = this.$route.params;
      let form = {};
      if (this.condList) {
        form = this.$refs.condition.form;
      }
      const params = { size: this.pagina.size, current: this.pagina.current };
      getGeneralList(id, params, form).then((res) => {
        const {
          count, current, data, size, moduleName,
        } = res.data;
        this.moduleName = moduleName;

        const column = formatColumn(data.column);
        this.tableData.column = column.concat({
          prop: 'createdAt',
          label: '创建时间',
          formatter: (row) => moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          width: '180',
          align: 'center',
        },
        {
          prop: 'updatedAt',
          label: '更新时间',
          formatter: (row) => moment(row.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
          width: '180',
          align: 'center',
        });

        this.tableData.row = data.row;
        // operation，meta 后期可拓展功能
        this.tableData.operation = middlewares.init(this.operation, this);
        this.tableData.meta = data.meta;
        const pagina = {
          current,
          size,
          total: count,
        };
        this.pagina = pagina;

        // 搜索组件
        this.condList = formatCondList(data.column);
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
.module {
  padding: 13px;
  background: white;
}
</style>
