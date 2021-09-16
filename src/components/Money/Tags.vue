<template>
  <div class="label">
    <div class="tagItem" @click="pushArray(index)" :class="type === '+' && 'selected'"
         v-for="(item,index) in tagHashTableOutPut" :key="item">
      <Icon :class="selectedTags.indexOf(index)>=0 && 'selected'" :name="index"/>
      <div>{{ item }}</div>
    </div>
    <div class="tagItem" @click="pushArray(index) " :class="type === '-' && 'selected'"
         v-for="(item,index) in tagHashTableInPut" :key="item">
      <Icon :class="selectedTags.indexOf(index)>=0 && 'selected'" :name="index"/>
      <div>{{ item }}</div>
    </div>
    <button class="addTag">
      <Icon name="add" @click="addTag"/>
      添加标签
    </button>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
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
    'salary': '工资',
    'hongbao': '红包',
    'claim': '报销',
    'finance': '理财',
    'parttime': '兼职'
  };

  @Prop() readonly value !: Tag[];
  @Prop(Array) readonly record!: string[];
  @Prop(String) readonly type !: string;
  selectedTags: string[] = [];
  tags: Tag[] = this.$store.state.tagList;

  beforeCreate(): void {
    this.$store.commit('loadTags');
  }

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

//todo 添加标签功能
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

  .tagItem, .addTag {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    width: 25%;
    padding: 10px 0;
    font-size: 12px;

    &.selected {
      display: none;
    }

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
</style>