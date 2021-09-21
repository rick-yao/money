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
  @Prop(String) value!: string;
  output = this.value;

  inputContent(e: MouseEvent): void {
    const button = (e.target as HTMLButtonElement);
    const input = button.textContent!;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input;
  }

  deleteContent(): void {
    if (this.output.length > 1) {
      this.output = this.output.substring(0, this.output.length - 1);
    } else {
      this.output = '0';
    }
  }

  clearContent(): void {
    this.output = '0';
  }

  submit(): void {
    this.$emit('update:value', this.output);
    this.$emit('update:finalResult', this.output);
  }
}
</script>

<style lang='scss' scoped>
@import "~@/views/style/global.scss";

.numberPad {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 3px #f5f5f5;

  .output {
    font-family: monospace;
    font-size: 24px;
    padding: 3px 16px;
    text-align: right;
    background: #f5f5f5;
  }

  .inputPad {
    background: linear-gradient(to bottom right, #f2f2f2, $color-theme);
    box-shadow: 0 0 3px #f5f5f5;

    button {
      box-shadow: 0 0 3px #f5f5f5;
      color: black;
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