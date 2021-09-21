<template>
  <div class="wrapper">
    <div class="bar">
      <button @click="goBack">返回</button>
      <div>编辑</div>
      <button @click="deleteRecord">删除</button>
    </div>
    <div class="content">
      <div class="name">
        <Icon :name="currentItem.selectedTags"/>
        <div>{{ tagHash[currentItem.selectedTags] }}</div>
      </div>
      <label class="notes">
        <span>备注:</span>
        <input type="text" :value="notes" @input="onNotesChanged($event.target.value)">
      </label>
      <label class="numbers">
        <span>金额:</span>
        <input type="number" :value="number"
               @input="onNumberChanged($event.target.value)">
      </label>
    </div>
    <button class="save" @click="save">保存</button>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class RecordEdit extends Vue {
  tagHash = this.$store.state.tagHashTable;
  notes = this.currentItem.notes;
  number = Math.abs(parseFloat(this.currentItem.number));

  deleteRecord(): void {
    this.recordList.splice(this.$store.state.currentIndex, 1);
    this.$store.commit('saveRecord');
    this.goBack();
  }

  onNotesChanged(e: string): void {
    this.notes = e;
  }

  onNumberChanged(e: number): void {
    this.number = e;
  }

  goBack(): void {
    this.$router.push('/records');
  }

  save(): void {
    let re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 （判断正整数 /^[1-9]+[0-9]*]*$/）
    if (re.test(this.number.toString())) {
      if (this.recordList[this.$store.state.currentIndex].type == '-') {
        this.recordList[this.$store.state.currentIndex].number = '-' + this.number.toString();
      } else {
        this.recordList[this.$store.state.currentIndex].number = this.number.toString();
      }
      this.recordList[this.$store.state.currentIndex].notes = this.notes;
      this.$store.commit('saveRecord');
      this.goBack();
    } else {
      window.prompt('金额格式不正确，请重新输入');
    }
  }

  beforeCreated(): void {
    this.$store.commit('loadRecords');

  }

  created(): void {
    const id = this.$route.params.id;
    const recordList = this.$store.state.recordList;
    this.$store.state.currentIndex = recordList.findIndex((t: RecordItem) => t.id == id.toString());
    this.notes = this.currentItem.notes;
    this.number = Math.abs(parseFloat(this.currentItem.number));
  }

  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }

  get currentItem(): RecordItem {
    return this.recordList[this.$store.state.currentIndex];
  }

}
</script>
<style lang='scss' scoped>
@import "~@/views/style/global.scss";

.wrapper {
  display: flex;
  flex-direction: column;

  .bar {
    height: 60px;
    width: 100%;
    display: flex;
    background: $color-theme;
    align-items: center;
    justify-content: space-between;

    button {
      padding: 0 20px;
    }

    button:last-child {
      color: red;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    font-size: 20px;

    .name {
      display: flex;
      align-items: center;
      padding-bottom: 10px;

      div {
        padding-left: 5px;
      }

      .goPrevious {
        height: 40px;
        width: 40px;
      }
    }

    .notes, .numbers {
      display: flex;
      align-items: center;
      padding-bottom: 10px;

      span {
        padding-right: 10px;
      }

      input {
        border: 1px solid #ccc;
        border-radius: 3px;
        outline-style: none;
      }

      input:focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
      }
    }
  }

  .save {
    width: 100px;
    background: #767676;
    color: white;
    padding: 12px 17px;
    border-radius: 4px;
    align-self: center;
  }
}
</style>