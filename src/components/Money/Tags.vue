<template>
  <div class="label">
    <ul class="tags">
      <li v-for='key in value' :key="key" @click="pushArray(key)" :class="selectedTags.indexOf(key)>=0 && 'selected'">
        {{ key }}
      </li>
    </ul>
    <div class="new">
      <button class="add" @click="addTag">新增标签</button>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop() readonly value!: string[];
  selectedTags: string[] = [];

  pushArray(key: string) {
    const index = this.selectedTags.indexOf(key);
    if (this.selectedTags.indexOf(key) >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(key);
    }
  }

  addTag() {
    const newTag = window.prompt('请输入标签名');
    if (newTag == '') {
      window.alert('标签名不能为空');
    } else {
      if (this.value) {
        this.$emit('update:value', [...this.value, newTag]);
      }
    }
  }

}
</script>

<style lang='scss' scoped>

.label {
  padding: 16px;

  .tags {
    display: flex;
    flex-direction: row;
    align-items: center;

    li {
      display: flex;
      justify-content: center;
      margin-right: 3px;
      background: #d4d4d4;
      width: 40px;
      border-radius: 8px 8px;

      &.selected {
        color: whitesmoke;
        background: #999;

      }
    }
  }


  .new {
    padding-top: 16px;

    .add {
      color: #999;
      border-bottom: 1px solid;
      padding: 0 3px;
    }
  }
;
}
</style>