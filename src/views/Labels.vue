<template>
  <layout>
    <router-view/>
    <div class="tagList">
      <router-link class="item" v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.name}`">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>

    </div>
    <Button button-name="新建标签" @click="addTag"></Button>
  </layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {tagListModel} from '@/models/model-tag';
import Icon from '@/components/Icon';
import Button from '@/components/Button.vue';


@Component({
  components: {Button, Icon},
})
export default class labels extends Vue {
  tags = tagListModel.fetch();

  addTag(): void {
    const newTag = window.prompt('请输入标签名');
    if (newTag == '') {
      window.alert('标签名不能为空');
    } else if (newTag && this.tags.indexOf(newTag) >= 0
    ) {
      window.alert('标签已存在');
      return;
    } else if (newTag) {
      tagListModel.create(newTag);
      tagListModel.save();
    }

  }
}
</script>

<style lang="scss" scoped>

.tagList {
  background: white;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding-left: 8px;

  .item {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px 10px 0;
    border-bottom: 1px solid #eeeef0;

    svg {
      width: 24px;
      height: 24px;
      color: #666;
    }
  }

}

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
