<template>
<div>
  <div :class="$style['header']">
    <module-dialog ref="moduleDialog" @success="editModule"/>
    <form-event-dialog ref="formEventDialog" @success="editFormEvent"/>
    <a-title>
      模块字段编辑器
      <template slot="button">
        <el-button size="mini" @click="cancel">返回模块列表</el-button>
        <el-button size="mini" type="primary" @click="onSubmit()">确定</el-button>
      </template>
    </a-title>
  </div>

  <div :class="$style['configuration']">
    <el-row :gutter="10">
      <el-col :span="5" :class="$style.sticky">
        <div :class="$style.col">
          <div :class="$style.title">
            <h4>
              <i class="el-icon-document-copy"></i>
              <span>基础字段池</span>
            </h4>
          </div>
          <draggable
            :list="fields"
            :group="{ name: 'people', pull: 'clone', put: false}"
            :sort="false"
            :clone="cloneHandle">
            <div
              v-for="(element, index) in fields"
              :class="$style['field-item']"
              :key="element.name">
              <p :class="$style.label">{{index + 1}}：{{ element.label }}</p>
            </div>
          </draggable>
        </div>
      </el-col>

      <el-col :span="13">
        <draggable
          :list="moduleList"
          group="module"
          handle=".module-handle">
          <div :class="$style.col" v-for="(item, index) in moduleList" :key="index">
            <div :class="$style.title">
              <h4>
                <i class="el-icon-receiving"></i>
                <span> {{item.name}}</span>
              </h4>
              <div>
                <el-button
                  class="module-handle"
                  size="mini"
                  icon="el-icon-thumb">
                </el-button>

                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  @click="openModuleDialog(item.name, index)">
                </el-button>

                <el-button
                  v-if="moduleList.length > 1"
                  size="mini"
                  type="danger"
                  icon="el-icon-remove-outline"
                  @click="removeModule(index)">
                </el-button>

                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  @click="addModule(index)">
                </el-button>

                <el-button
                  v-if="item.list.length"
                  size="mini"
                  :icon="item.open ? 'el-icon-arrow-down' : 'el-icon-arrow-left'"
                  @click="expandCollapseModule(item, index)">
                </el-button>
              </div>
            </div>
            <draggable
              v-show="item.open"
              :class="$style.edit"
              :style="{
                border: item.list.length ? 'none' : '1px dashed #f0f0f0',
                padding: item.list.length ? 0 : '10px'
              }"
              :list="item.list"
              group="people">
              <div
                v-for="(element, i) in item.list"
                :class="$style['field-item']"
                :style="{ border: element.set ? '1px dashed #409eff' : '1px dashed #e0e0e0'}"
                :key="`${element.name}${i}`">
                <div>
                  <i @click="delField(item.list, i, element)" class="el-icon-delete"></i>
                  &nbsp;
                  <i v-if="!element.set" @click="setField(index, i)" class="el-icon-setting"></i>
                  <i v-else @click="unSetField(index, i)" class="el-icon-s-tools"></i>
                </div>
                <p :class="$style.label">{{ element.label || '--' }}</p>
              </div>
            </draggable>
            <div v-show="!item.list.length" :class="$style.tip"><i class="el-icon-info"></i> 请添加字段</div>
            <div v-show="!item.open" :class="$style.tip"><i class="el-icon-info"></i> 已收起</div>
          </div>
        </draggable>
      </el-col>

      <el-col :span="6" :class="$style.sticky">
        <div :class="$style.col">
          <div :class="$style.title">
            <h4>
              <i class="el-icon-edit-outline"></i>
              <span> 字段属性</span>
            </h4>
            <div>
              <el-button
                v-if="editField"
                size="mini"
                type="primary"
                icon="el-icon-magic-stick"
                @click="openFormEventDialog(editField.event)">
              </el-button>
            </div>
          </div>
          <div :class="$style['edit-field']">
            <template v-if="editField">
              <el-form ref="ruleForm" :model="editField" label-position="top" size="small" :rules="rules">
                <el-form-item label="字段名" prop="name">
                  <el-input v-model="editField.name"></el-input>
                </el-form-item>
                <el-form-item label="字段标签" prop="label">
                  <el-input v-model="editField.label"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="describe">
                  <el-input v-model="editField.describe"></el-input>
                </el-form-item>

                <el-form-item label="是否必填" prop="required">
                  <el-radio-group
                    v-model="editField.required">
                    <el-radio :label="true">必填</el-radio>
                    <el-radio :label="false">非必填</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="显示到列表" prop="showToList">
                  <el-radio-group
                    v-model="editField.showToList">
                    <el-radio :label="true">显示</el-radio>
                    <el-radio :label="false">不显示</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="列表上是否可搜索" prop="searchAsList">
                  <el-radio-group
                    v-model="editField.searchAsList">
                    <el-radio :label="true">可搜索</el-radio>
                    <el-radio :label="false">不可搜索</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item v-if="showOptionFormItem" label="选项接口" prop="options">
                  <el-input v-model="editField.options"></el-input>
                </el-form-item>


                <el-form-item>
                  <span slot="label">
                    组件附加属性
                    <i class="el-icon-circle-plus-outline" @click="addFieldMeta()"></i>
                    &nbsp;
                    <i class="el-icon-remove-outline" @click="removeFieldMeta()"></i>
                  </span>
                  <el-row :class="$style['meta-row']" :gutter="10" v-for="(item, index) in editMeta" :key="index">
                    <el-col :span="12"><el-input v-model="item.key"></el-input></el-col>
                    <el-col :span="12"><el-input v-model="item.value"></el-input></el-col>
                  </el-row>
                </el-form-item>

              </el-form>
            </template>
            <div v-else :class="$style.tip"><i class="el-icon-info"></i> 请选择一个字段</div>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</div>
</template>

<script>
import message from 'lib/message';
import aTitle from 'components/a-title.vue';
import _ from 'lodash';
import draggable from 'vuedraggable';
import { getById, patch } from 'wrapper/ajax/module';
import { itemEnum } from 'components/dynamic-form-fields/fields';
import moduleDialog from './module-dialog.vue';
import formEventDialog from './form-event-dialog.vue';
import mixinForm from './mixin-form';
import mixinModule from './mixin-module';

export default {
  name: 'system.module.field',
  mixins: [
    mixinForm,
    mixinModule,
  ],
  data() {
    return {
      editField: null, // 当前正在给那个字段编辑属性
      editMeta: [], // （中转值，给正在编辑的字段赋值meta）ele 原生属性
      fields: itemEnum,
      key: 0, // 是可变的，获取值的时候需要设置
      moduleList: [
        {
          name: '新区域一（请改名）',
          open: true,
          list: [],
        },
        {
          name: '新区域二（请改名）',
          open: true,
          list: [],
        },
        {
          name: '新区域三（请改名）',
          open: true,
          list: [],
        },
      ],
    };
  },
  components: {
    aTitle,
    draggable,
    moduleDialog,
    formEventDialog,
  },
  mounted() {
    this.init();
  },
  computed: {
    showOptionFormItem() {
      if (this.editField) {
        const { type } = this.editField;
        return ['SELECT', 'RADIO'].indexOf(type) >= 0;
      }
      return false;
    },
  },
  methods: {
    init() {
      const { id } = this.$route.params;
      getById(id).then((res) => {
        if (!res.data.module.length) return;
        this.moduleList = res.data.module;
        this.moduleList = this.moduleList.map((item) => {
          const list = item.list.map((i) => ({ ...i, set: false }));
          return { ...item, list };
        });
      });
    },
    cancel() {
      this.$router.push({ name: 'system.module.default' });
    },
    async onSubmit() {
      let validationStatus = true;
      if (this.editField) {
        validationStatus = await this.fieldValidate();
      }
      if (validationStatus) {
        const arra = this.moduleList.reduce((arr, item) => {
          let a = arr;
          a = _.cloneDeep(item.list).concat(arr);
          return a;
        }, []);

        if (new Set(arra.map((item) => item.name)).size === arra.length) {
          const { id } = this.$route.params;
          patch({ module: this.moduleList }, id).then(() => {
            message.success('编辑成功');
            this.$router.push({ name: 'system.module.default' });
          });
        } else {
          message.error('字段名有重复，请检查');
        }
      }
    },
  },
};
</script>
<style lang="scss" module>
.header{
  padding: 13px;
  padding-bottom: 0;
  background: white;
}
.configuration{
  padding: 10px 0;
  .sticky{
    position: sticky;
    top:0;
  }
  .col{
    border: 1px solid #f0f0f0;
    padding: 13px;
    padding-bottom: 0;
    margin-bottom: 10px;
    background: white;
    :global(.el-button--mini){
      padding: 7px;
    }
    .title {
      padding-bottom: 5px;
      margin-bottom: 12px;
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
      padding: 10px;
      margin-bottom: 10px;
      cursor: move;
      .label{
        overflow: hidden;
      }
    }
    .edit{
      display: grid;
      grid-template-columns: 32% 32% 32%;
      grid-column-gap: 2%;
      min-height: 52px;
    }
    .edit-field{
      :global(.el-form-item__label){
        padding: 0;
      }
      :global(.el-input__inner){
        padding: 0 8px;
      }
      .meta-row{
        margin-top: 10px;
      }
    }
  }
}
</style>
