<template>
  <div class="types">
    <div :class="this.value==='-'? 'selected' :'' " @click="selectType('-')">支出</div>
    <div :class="this.value==='+'? 'selected' :'' " @click="selectType('+')">收入</div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  props: {
    value: String
  }
})
export default class Types extends Vue {

  selectType(types: string) {
    if (types !== '+' && types !== '-') {
      throw new Error('type错误');
    }
    this.$emit('update:value', types);
  }
}
</script>

<style lang='scss' scoped>
.types {
  display: flex;
  background: #c4c4c4;
  text-align: center;

  div {
    width: 50%;
    font-size: 24px;
    line-height: 64px;
    position: relative;
  }

  .selected::after {
    content: '';
    bottom: 0;
    left: 0;
    position: absolute;
    border: 2px solid #333;
    width: 100%;
  }
}
</style>