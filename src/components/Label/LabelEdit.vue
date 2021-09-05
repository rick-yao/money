<template>
  <layout>
    <nav class="topBar">
      <Icon name="left" class="icon"/>
      <span class="title">编辑标签</span>
      <span class="rightBlank"></span>
    </nav>
    <Notes class="input" :value.sync="inputContent" name="标签名" place-holder="标签值"/>
    <Button @click="deleteButton" button-name="删除标签"/>
  </layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, Notes}
})
export default class LabelEdit extends Vue {
  inputContent = '';

  deleteButton() {
    console.log('1');
  }

  @Watch('inputContent') onInputContentChanged(val: string): void {
    this.inputContent = val;
  }
}
</script>

<style lang='scss' scoped>
.topBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  background: white;
  padding: 12px 0;

  .icon {
    height: 24px;
    width: 24px;
  }

  .title {
  }

  .rightBlank {
    width: 24px;
    height: 24px;
  }
}

.input {
  background: white;
  margin-top: 8px;
}
</style>