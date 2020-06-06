<template>
  <span :class="$style['reference']">
    <el-tooltip
      :disabled="visible || `${changeData}`.length < substr"
      effect="dark"
      :content="`${changeData}` || '请填写'"
      placement="top">
        <span :class="$style.text" @click="inputClick()">
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
            </template>
            <span v-else>
              {{`${changeData}` || '请填写' | substr(substr)}}
              <span v-if="append">{{append}}</span>
            </span>
        </span>
    </el-tooltip>
    <i
      @mouseover="emptyingOperation=true"
      @mouseout="emptyingOperation=false"
      @click.stop="clearable()"
      :class="{
        [$style['arrow-visible']]:visible,
        ['el-icon-edit-outline']: !emptyingOperation,
        ['el-icon-error']: emptyingOperation
      }">
      </i>
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
    type: getPropString('text'),
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
        if (this.type === 'number') {
          const num = Number(val);
          if (num && num !== 0) {
            this.$emit('change', num);
            return num;
          }
          this.$emit('change', '');
          return '';
        }
        this.$emit('change', val);
        return val;
      },
    },
  },
  data() {
    return {
      emptyingOperation: false,
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
    clearable() {
      this.changeData = '';
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
    .text{
      color: #3d4b59;
      line-height: 28px;
      cursor: pointer;
      .label{
        font-weight: bolder;
        color: #999999;
      }
      .input{
        width: 150px;
        :global(.el-input-group__append){
            padding: 0 5px;
        }
      }
    }
    i{
      padding-left: 5px;
      font-size: 14px;
      color: #9d9d9d;
      font-weight: 900;
    }
    .arrow-visible{
      color: #409eff;
    }
}
</style>
