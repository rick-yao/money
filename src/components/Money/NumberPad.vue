<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="inputPad">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="deleteContent">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clearContent">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="submit">OK</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop() value!: string;
  output = this.value;

  inputContent(e: MouseEvent) {
    const tmp = (e.target as HTMLButtonElement).textContent;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === '0') {
      if (tmp === '0') {
        return;
      }
    }
    if (tmp === '.') {
      if (this.output.indexOf('.') >= 0) {
        return;
      }
      this.output += tmp;
    }
    if (tmp && '123456789'.indexOf(tmp) >= 0) {
      if (this.output === '0') {
        this.output = tmp;
        return;
      }
      this.output += tmp;
    }
  }

  deleteContent() {
    if (this.output.length > 1) {
      this.output = this.output.substring(0, this.output.length - 1);
    } else {
      this.output = '0';
    }
  }

  clearContent() {
    this.output = '0';
  }

  submit() {
    this.$emit('update:OK', this.output);
  }
}
</script>

<style lang='scss' scoped>
.numberPad {
  display: flex;
  flex-direction: column;

  .output {
    font-family: monospace;
    font-size: 36px;
    padding: 9px 16px;
    text-align: right;
  }

  .inputPad {
    background: linear-gradient(to bottom right, #f2f2f2, #8b8b8b);

    button {
      height: 64px;
      width: 25%;

      &.ok {
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 25*2%;
      }
    }
  }
}
</style>