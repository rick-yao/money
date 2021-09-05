<template>
  <div class="notes">
    <label>
      <span>{{ this.name }}</span>
      <input type="text" :placeholder="this.placeHolder" :value="value" @input="onNoteChanged($event.target.value)">
    </label>
  </div>
</template>

<script lang='ts'>

import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

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
.notes {
  label {
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 20px 0;

    span {
      padding: 0 20px;
    }

    input {
      border: none;
      flex-grow: 1;
      background: inherit;
    }
  }
}
</style>