<template>
  <layout>
    <nav class="topBar">
      <Icon name="left" class="icon"/>
      <span class="title">编辑标签</span>
      <span class="rightBlank"></span>
    </nav>
    <Notes class="input" :value.sync="tag" name="标签名" place-holder="标签值"/>
    <Button @click="saveButton" button-name="保存"/>
    <Button @click="deleteButton" button-name="删除标签"/>
    {{ this.tag }}
  </layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue';
import {tagListModel} from '@/models/model-tag';

@Component({
  components: {Button, Notes}
})
export default class LabelEdit extends Vue {
  tag = '';

  created(): void {
    const id = this.$route.params.id;
    const tag = tagListModel.fetch();
    const index = tag.findIndex(id => id === tag);
    if (tag.indexOf(id) >= 0) {
      console.log(tag);

      return;
    } else {
      this.$router.replace('/404');
    }
  }

  deleteButton() {
    console.log('1');
  }

  saveButton() {
    console.log(1);
    tagListModel.save();
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