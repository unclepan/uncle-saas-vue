<template>
  <span :class="$style['reference']" @click="inputClick()">
    <el-tooltip
      :disabled="visible || changeData.length < substr"
      effect="dark"
      :content="changeData || '请填写'"
      placement="top">
        <span :class="$style.text">
            <span :class="$style.label">{{label}}：</span>
            <template v-if="visible">
              <el-input
                @blur="inputBlur()"
                ref="input"
                :class="$style.input"
                size="mini"
                v-model="changeData"
                placeholder="请输入">
                <template v-if="append" slot="append">{{append}}</template>
              </el-input>
              <el-button @click.stop.prevent="inputBlur()" type="primary" size="mini">确定</el-button>
            </template>
            <span v-else>
              {{changeData || '请填写' | substr(substr)}}
              <span v-if="append">{{append}}</span>
            </span>
        </span>
    </el-tooltip>
    <i class="el-icon-edit-outline" :class="{[$style['arrow-visible']]:visible}"></i>
  </span>
</template>
<script>
import {
  getPropString,
  getPropNumber,
  getPropFunction,
} from 'lib/vue-prop';

export default {
  props: {
    checked: {},
    substr: getPropNumber(12),
    label: getPropString('输入型筛选组件'),
    append: getPropString(),
    cb: getPropFunction(),
  },
  model: {
    prop: 'checked',
    event: 'change',
  },
  computed: {
    changeData: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit('change', val);
        return val;
      },
    },
  },
  data() {
    return {
      visible: false,
    };
  },

  methods: {
    inputClick() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    inputBlur() {
      this.visible = false;
      this.cb(this.changeData);
    },
  },
};
</script>
<style lang="scss" module>
.reference{
    padding:5px 26px 5px 0;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    .text{
      color: #3d4b59;
      padding-right: 5px;
      line-height: 28px;
      .label{
        font-weight: bolder;
        color: #999999;
      }
      .input{
        padding-right: 5px;
        width: 150px;
        :global(.el-input-group__append){
            padding: 0 5px;
        }
      }
    }
    i{
      font-size: 14px;
      color: #9d9d9d;
      font-weight: 900;
    }
    .arrow-visible{
      color: #409eff;
    }
}
</style>
