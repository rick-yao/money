<template>
  <div class="types">
    <div :class="type==='-'? 'selected' :'' " @click="selectType('-')">支出</div>
    <div :class="type==='+'? 'selected' :'' " @click="selectType('+')">收入</div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component({
  props: {
    msg: 0
  }
})
export default class Types extends Vue {
  type = '-';

  selectType(types: string) {
    if (types !== '+' && types !== '-') {
      throw new Error('type错误');
    }
    this.type = types;
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