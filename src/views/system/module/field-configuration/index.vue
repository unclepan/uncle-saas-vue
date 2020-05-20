<template>
<div>
  <div :class="$style['field-configuration']">
    <a-title>
      模块编辑器
      <template slot="button">
        <el-button size="mini" @click="cancel">返回模块列表</el-button>
        <el-button size="mini" type="primary" @click="onSubmit">确定</el-button>
      </template>
    </a-title>
  </div>

  <div :class="$style.main">
    <el-row :gutter="10">
      <el-col :span="6">
        <div :class="$style.col">
          <div :class="$style.title">
            <h4>
              <i class="el-icon-document-copy"></i>
              <span> 基础字段池</span>
            </h4>
          </div>

          <draggable
            :list="list1"
            :group="{ name: 'people', pull: 'clone', put: false}"
            :sort="false">
            <div
              :class="$style['field-item']"
              v-for="(element,index) in list1"
              :key="`${element.name}${index}`">
              {{ element.name }}
            </div>
          </draggable>

        </div>
      </el-col>

      <el-col :span="12">
        <div :class="$style.col" v-for="(item, index) in moduleList" :key="index">
          <div :class="$style.title">
            <h4>
              <i class="el-icon-document-checked"></i>
              <span> {{item.name}}</span>
            </h4>
            <div>
              <el-button size="mini" icon="el-icon-arrow-up"></el-button>
              <el-button size="mini" icon="el-icon-arrow-down"></el-button>
              <el-button size="mini" icon="el-icon-edit"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-remove-outline"></el-button>
              <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="add()"></el-button>
            </div>
          </div>

          <draggable
            :class="$style.edit"
            :style="{border: item.list.length ? 'none' : '1px dashed #f0f0f0'}"
            :list="item.list"
            group="people">
            <div
              :class="$style['field-item']"
              v-for="(element, i) in item.list"
              :key="`${element.name}${i}`">
              {{ element.name }}{{i}}
              <p @click="del(item.list, i)">X</p>
            </div>
          </draggable>

          <div v-show="!item.list.length" :class="$style.tip"><i class="el-icon-info"></i> 请添加字段</div>
        </div>
      </el-col>

      <el-col :span="6">
        <div :class="$style.col">

          <div :class="$style.title">
            <h4>
              <i class="el-icon-edit-outline"></i>
              <span> 字段属性</span>
            </h4>
          </div>

          <div :class="$style['edit-field']">
            <div :class="$style.tip"><i class="el-icon-info"></i> 请选择一个字段</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import aTitle from 'components/a-title.vue';
import draggable from 'vuedraggable';

export default {
  name: 'system.module.field',
  data() {
    return {
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 },
      ],
      moduleList: [{
        name: '模块区域1',
        list: [],
      }, {
        name: '模块区域2',
        list: [],
      }],
    };
  },
  components: {
    aTitle,
    draggable,
  },
  mounted() {
  },
  methods: {
    del(element, index) {
      element.splice(index, 1);
    },
    add() {
      this.moduleList.splice(0, 0, {
        name: '新模块区域（请改名）',
        list: [],
      });
    },
    cancel() {
      this.$router.push({ name: 'system.module.default' });
    },
    onSubmit() {
      console.log('确定');
    },
  },
};
</script>
<style lang="scss" module>
.field-configuration{
  padding: 20px;
  background: white;
}
.main{
  padding: 10px 0;
  .col{
    border: 1px solid #f0f0f0;
    padding: 10px 20px;
    padding-bottom: 0;
    margin-bottom: 10px;
    background: white;
    .title{
      padding: 5px 0;
      margin-bottom: 18px;
      color: #052644;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tip{
      color: #999999;
      padding: 10px 0 20px;
    }
    .field-item{
      border: 1px dashed #e0e0e0;
      border-radius: 5px;
      background: #fefefe;
      padding: 12px;
      margin-bottom: 18px;
      min-height: 52px;
    }
    .edit{
      display: grid;
      grid-template-columns: 48% 48%;
      grid-column-gap: 4%;
      min-height: 52px;
      .field-item{
        margin-bottom: 18px;
      }
    }
    .edit-field{
      margin: 18px 0;
    }
  }
}
</style>
