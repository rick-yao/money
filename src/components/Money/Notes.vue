<template>
  <div class="notes">
    <label>
      <span>
        <Icon name="note"/>
        {{ this.name }}
      </span>
      <input type="text" :placeholder="this.placeHolder" :value="value" @input="onNoteChanged($event.target.value)">
    </label>
  </div>
</template>

<script lang='ts'>

import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  props: {
    name: String,
    placeHolder: String,
    value: String
  }
})
export default class Notes extends Vue {

  onNoteChanged(val: string): void {
    this.$emit('update:value', val);
  }
}
</script>

<style lang='scss' scoped>
@import "~@/views/style/global.scss";

.notes {
  label {
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 2px 0;
    box-shadow: 0 0 3px #f5f5f5;

    span {
      padding-right: 20px;
      padding-left: 10px;
    }

    input {
      border: none;
      flex-grow: 1;
      background: inherit;
    }
  }
}
</style>