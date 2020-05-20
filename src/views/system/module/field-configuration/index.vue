<template>
<div>
  <div :class="$style['field-configuration']">
    <module-dialog ref="moduleDialog" @success="editModule"/>
    <a-title>
      模块编辑器
      <template slot="button">
        <el-button size="mini" @click="cancel">返回模块列表</el-button>
        <el-button size="mini" type="primary" @click="onSubmit('ruleForm')">确定</el-button>
      </template>
    </a-title>
  </div>

  <div :class="$style.main">
    <el-row :gutter="10">
      <el-col :span="5">
        <div :class="$style.col">
          <div :class="$style.title">
            <h4>
              <i class="el-icon-document-copy"></i>
              <span> 基础字段池</span>
            </h4>
          </div>

          <draggable
            :list="fields"
            :group="{ name: 'people', pull: 'clone', put: false}"
            :sort="false"
            :clone="cloneHandle">
            <div
              v-for="element in fields"
              :class="$style['field-item']"
              :key="element.name">
              {{ element.label }}
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
                <el-button class="module-handle" size="mini" icon="el-icon-thumb"></el-button>
                <el-button size="mini" icon="el-icon-edit" @click="openModuleDialog(item.name, index)"></el-button>
                <el-button
                  v-if="moduleList.length > 1"
                  size="mini"
                  type="danger"
                  icon="el-icon-remove-outline"
                  @click="removeModule(index)">
                </el-button>
                <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="addModule(index)"></el-button>
              </div>
            </div>

            <draggable
              :class="$style.edit"
              :style="{ border: item.list.length ? 'none' : '1px dashed #f0f0f0'}"
              :list="item.list"
              group="people">
              <div
                v-for="(element, i) in item.list"
                :class="$style['field-item']"
                :style="{ border: element.set ? '1px dashed #409eff' : '1px dashed #e0e0e0'}"
                :key="`${element.name}${i}`">
                <div>
                  <i @click="delField(item.list, i)" class="el-icon-delete"></i>
                  &nbsp;
                  <i v-if="!element.set" @click="setField(index, i)" class="el-icon-setting"></i>
                  <i v-else @click="unSetField(index, i)" class="el-icon-s-tools"></i>
                </div>
                <p>{{ element.label || '--' }}</p>
              </div>
            </draggable>

            <div v-show="!item.list.length" :class="$style.tip"><i class="el-icon-info"></i> 请添加字段</div>
          </div>
        </draggable>
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
            <template v-if="editField">
              <el-form ref="ruleForm" :model="editField" label-position="top" size="mini" :rules="rules">
                <el-form-item label="字段名" prop="name">
                  <el-input v-model="editField.name"></el-input>
                </el-form-item>
                <el-form-item label="字段标签" prop="label">
                  <el-input v-model="editField.label"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="describe">
                  <el-input v-model="editField.describe"></el-input>
                </el-form-item>
              </el-form>

              <el-form label-position="top" size="mini">
                <el-form-item>
                  <span slot="label">
                    组件属性
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
import aTitle from 'components/a-title.vue';
import draggable from 'vuedraggable';
import fields from './fields';
import moduleDialog from './module-dialog.vue';

export default {
  name: 'system.module.field',
  data() {
    return {
      editMeta: [], // ele 原生属性
      editField: null,
      fields,
      moduleList: [{
        name: '新模块区域（请改名）',
        list: [],
      }],
      rules: {
        name: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!(/^[a-z]+$/i).test(value)) {
                callback(new Error('非英文，请正确填写'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
          {
            min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur',
          },
        ],
        label: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur',
          },
        ],
      },
    };
  },
  components: {
    aTitle,
    draggable,
    moduleDialog,
  },
  watch: {
    editMeta: {
      handler(val) {
        const meta = val.reduce((obj, item) => {
          const o = obj;
          if (item.key && item.value) {
            o[item.key] = item.value;
          }
          return o;
        }, {});

        if (this.editField) {
          this.editField.meta = meta;
        }
      },
      deep: true,
    },
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'system.module.default' });
    },
    onSubmit() {
      console.log(this.moduleList);
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     console.log(this.moduleList);
      //   } else {
      //     console.log('error submit!!');
      //   }
      // });
    },
    delField(element, index) {
      element.splice(index, 1);
    },
    setField(i1, i2) {
      this.moduleList = this.moduleList.map((item, index1) => {
        const list = item.list.map((i, index2) => {
          if (index1 === i1 && index2 === i2) {
            return { ...i, set: true };
          }
          return { ...i, set: false };
        });
        return { ...item, list };
      });
      this.editField = this.moduleList[i1].list[i2];
      const { meta } = this.editField;
      this.editMeta = [].concat(Object.keys(meta).map((key) => ({ key, value: meta[key] })));
    },
    unSetField() {
      this.moduleList = this.moduleList.map((item) => {
        const list = item.list.map((i) => ({ ...i, set: false }));
        return { ...item, list };
      });
      this.editField = null;
      this.editMeta = [];
    },
    addModule(index) {
      this.moduleList.splice(index, 0, {
        name: '新模块区域（请改名）',
        list: [],
      });
    },
    removeModule(index) {
      this.moduleList.splice(index, 1);
    },
    editModule(data) {
      this.moduleList[data.moduleIndex].name = data.name;
    },
    addFieldMeta() {
      this.editMeta.push({
        key: '',
        value: '',
      });
    },
    removeFieldMeta() {
      this.editMeta.splice(-1, 1);
    },
    openModuleDialog(val, index) {
      this.$refs.moduleDialog.open(val, index);
    },
    cloneHandle(field) {
      return { ...field };
    },
  },
};
</script>
<style lang="scss" module>
.field-configuration{
  padding: 20px;
  padding-bottom: 0;
  background: white;
}
.main{
  padding: 10px 0;
  .col{
    border: 1px solid #f0f0f0;
    padding: 10px;
    padding-bottom: 0;
    margin-bottom: 10px;
    background: white;
    :global(.el-button--mini){
      padding: 7px;
    }
    .title{
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
      cursor: pointer;
      overflow: hidden;
    }
    .edit{
      display: grid;
      grid-template-columns: 32% 32% 32%;
      grid-column-gap: 2%;
      min-height: 42px;
    }
    .edit-field{
      margin: 18px 0;
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
