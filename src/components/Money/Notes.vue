<template>
  <div class="notes">
    <label>
      <span>备注</span>
      <input type="text" placeholder="在这里添加备注" v-model="note">
    </label>
  </div>
</template>

<script lang='ts'>

import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

@Component({
  props: {
    value: String
  }
})
export default class Notes extends Vue {
  note = '';

  @Watch('note') onNoteChanged(val: string): void {
    this.$emit('update:value', val);
  }
}
</script>

<style lang='scss' scoped>
.notes {
  label {
    display: flex;
    align-items: center;
    background: #f5f5f5;
    font-size: 14px;
    padding: 20px 0;

    span {
      padding: 0 20px;
    }

    input {
      border: none;
      flex-grow: 1;
      background: #f5f5f5;
    }
  }
}
</style>