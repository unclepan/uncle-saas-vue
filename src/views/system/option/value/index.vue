<template>
  <div :class="$style['option-value']">
    <data-dialog
      ref="dialog"
      @success="init"/>
    <a-header @success="init"/>
    <a-table v-loading="loading" :tableData="tableData"/>
  </div>
</template>

<script>
import aTable from 'components/a-table/index.vue';
// import { optionValueEname, optionValueDelete } from 'wrapper/ajax/system/option';
import header from './header.vue';
import dataDialog from './data-dialog.vue';

export default {
  name: 'system.option.value',
  data() {
    const self = this;
    return {
      loading: true,
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
            label: '选项对应值',
          },
          {
            prop: 'lastModifiedTime',
            label: '最后修改时间',
          },
        ],
        row: [],
        operation: [
          {
            label: '编辑',
            func: (data) => {
              self.edit(data);
            },
          },
          {
            label: '删除',
            type: 'danger',
            func: (data) => {
              self.delete(data);
            },
          },
        ],
      },
    };
  },
  components: {
    'a-header': header,
    aTable,
    dataDialog,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // this.loading = true;
      // const { id } = this.$route.params;
      // optionValueEname(id).then((res) => {
      //   this.tableData.row = res.data;
      //   this.loading = false;
      // });
    },
    // edit(data) {
    //   this.$refs.dialog.open({ type: 'edit', title: '编辑选项值', data });
    // },
    // async delete(data) {
    //   const stl = await message.confirm(this, `确认删除：${data.name} ？`);
    //   if (stl) {
    //     const { id } = data;
    //     optionValueDelete({ id }).then((res) => {
    //       message.success(res.message);
    //       this.init();
    //     });
    //   }
    // },
  },
};
</script>
<style lang="scss" module>
.option-value{
  background: #ffffff;
  padding: 16px;
}
</style>
