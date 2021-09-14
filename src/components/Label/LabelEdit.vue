<template>
  <layout>
    <nav class="topBar">
      <Icon name="left" class="goPrevious" @click.native="goPrevious"/>
      <span class="title">编辑标签</span>
      <span class="rightBlank"></span>
    </nav>
    <Notes class="input" :value="currentTag.name" name="标签名" place-holder="标签值" @update:value="updateTag"/>
    <Button @click="deleteButton" button-name="删除标签"/>
  </layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, Notes}
})
export default class LabelEdit extends Vue {
  get currentTag(): Tag {
    return this.$store.state.currentTag;
  }

  beforeCreate(): void {
    this.$store.commit('loadTags');
  }

  created(): void {
    const pathName = this.$route.params.id;
    const tag: Tag[] = this.$store.state.tagList;
    const index = tag.findIndex(item => item.name === pathName);
    if (index >= 0) {
      this.$store.commit('setCurrentTag', pathName);
      return;
    } else {
      this.$router.replace('/404');
    }
  }

  goPrevious(): void {
    this.$router.back();
  }

  deleteButton(): void {
    this.$store.dispatch('removeTag', this.$store.state.currentTag.index);
    this.goPrevious();
  }

  updateTag(val: string): void {
    this.$store.dispatch('updateTag', {id: this.currentTag.id, name: val});
  }

  // @Watch('inputContent') onInputContentChanged(val: string): void {
  //   this.inputContent = val;
  // }
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

  .goPrevious {
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