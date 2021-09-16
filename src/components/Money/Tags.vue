<template>
  <div class="label">
    <div class="tagItem" @click="pushArray(index)"
         v-for="(item,index) in tagHashTableOutPut" :key="item">
      <div class="iconWrapper">
        <Icon :class="selectedTags.indexOf(index)>=0 && 'selected'" :name="index"/>
      </div>
      <div>{{ item }}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
//todo 序列化标签

@Component
export default class Tags extends Vue {
  tagArrayOutPut = [];
  tagHashTableOutPut = {
    'baoxian': '保险',
    'dianfei': '电费',
    'food': '食物',
    'fumu': '父母',
    'huafei': '话费',
    'shenghuojiaofei': '生活缴费',
    'shoujihao': '手机号',
    'xiche': '洗车',
  };
  tagHashTableInPut = {
    'hongbao': '红包',

  };

  @Prop() readonly value !: Tag[];
  @Prop(Array) readonly record!: string[];
  selectedTags: string[] = [];
  tags: Tag[] = this.$store.state.tagList;

  beforeCreate(): void {
    this.$store.commit('loadTags');
  }

//todo 添加标签功能
  pushArray(key: string): void {
    if (this.selectedTags.length >= 0 && this.selectedTags.indexOf(key) >= 0) {
      this.selectedTags = [];
    } else {
      this.selectedTags = [];
      this.selectedTags.push(key);
    }
  }

  @Watch('selectedTags') onSelectedTagsChanged(val: string): void {
    this.$emit('update:record', val);
  }

  addTag(): void {
    const newTag: string = window.prompt('请输入标签名') || '';
    const nameList = this.tags.map(t => t.name);
    if (newTag == '') {
      window.alert('标签名不能为空');
    } else if (nameList.indexOf(newTag) >= 0
    ) {
      window.alert('标签已存在');
      return;
    } else {
      this.$store.dispatch('createTag', newTag);
    }
  }


}
</script>

<style lang='scss' scoped>
@import "~@/views/style/global.scss";

.label {
  display: flex;
  flex-wrap: wrap;

  .tagItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    width: 25%;
    padding: 10px 0;

    .iconWrapper {
      .goPrevious {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #f5f5f5;

        &.selected {
          background: $color-theme;

        }
      }
    }
  }
}

//.label {
//  padding: 16px;
//
//  .tags {
//    display: flex;
//    flex-direction: row;
//    align-items: center;
//
//    li {
//      display: flex;
//      justify-content: center;
//      margin-right: 3px;
//      background: #d4d4d4;
//      width: 40px;
//      border-radius: 8px 8px;
//
//      &.selected {
//        color: whitesmoke;
//        background: #999;
//
//      }
//    }
//  }
//
//
//  .new {
//    padding-top: 16px;
//
//    .add {
//      color: #999;
//      border-bottom: 1px solid;
//      padding: 0 3px;
//    }
//  }
//;
//}
</style>