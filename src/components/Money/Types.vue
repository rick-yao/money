<template>
  <div class="controlBar">
    <div class="idle"></div>
    <div class="selectPad">
      <div :class="this.value==='-'? 'selected' :'' " @click="selectType('-')">支出</div>
      <div :class="this.value==='+'? 'selected' :'' " @click="selectType('+')">收入</div>
    </div>
    <button @click="goBack">取消</button>
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
  goBack(): void {
    this.$router.push('/labels');
  }

  selectType(types: string): void {
    if (types !== '+' && types !== '-') {
      throw new Error('type错误');
    }
    this.$emit('update:value', types);
  }
}
</script>

<style lang='scss' scoped>
@import '~@/views/style/global.scss';

.controlBar {
  .selected::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    border: 1px solid black;
    width: 58px;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-height: 20px;
  background: $color-theme;
  padding: 20px;

  .selectPad {
    display: flex;
    font-size: 20px;


    > div {
      padding: 0 10px;
      position: relative;


    }
  }

  .idle {
    width: 32px;
    height: 24px;
  }

  button {
  }
}

</style>