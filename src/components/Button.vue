<template>
  <div class="addTag-wrapper">
    <button class="addTag" @click="$emit('click',$event)">{{ this.buttonName }}</button>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  props: {
    buttonName: String
  }
})
export default class Button extends Vue {

}
</script>

<style lang='scss' scoped>
.addTag {
  background: #767676;
  color: white;
  padding: 8px 17px;
  border-radius: 4px;

  &-wrapper {
    padding: 44px 0;
    text-align: center;
  }
}
</style>