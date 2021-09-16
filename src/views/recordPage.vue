<template>
  <layout class="contentWrapper">
    <div class="controlBar">
      <div class="idle"></div>
      <div class="selectPad">
        <div class="selected">支出</div>
        <div>收入</div>
      </div>
      <button>取消</button>
    </div>
    <ul class="tagList">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
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
  </layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class recordPage extends Vue {
  output = '0';

  inputContent(e: MouseEvent): void {
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
}
</script>

<style lang='scss' scoped>
@import '~@/views/style/global.scss';

.selected::after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  border: 1px solid black;
  width: 58px;
}

.contentWrapper {
  display: flex;
  flex-direction: column;

  .controlBar {
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
      width: 1px;
      height: 1px;
    }

    button {
    }
  }

  .tagList {
    li {
    }
  }

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
      background: linear-gradient(to bottom right, #f2f2f2, $color-theme);

      button {
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
}
</style>