<template>
  <div class="contentWrapper">
    <Icon name="notification" class="svg"/>
    <div>暂无记录，去记几笔吧～</div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NoneNotification extends Vue {

}
</script>

<style lang='scss' scoped>
.contentWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .svg {
    width: 80px;
    height: 80px;
    margin-top: 100px;
  }

  
  div {
    padding-top: 10px;
    color: dimgrey;
  }
}
</style>