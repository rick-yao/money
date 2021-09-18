<template>
  <layout class="contentWrapper">
    <div class="title">轻松记账</div>
    <div class="overView">
      <div class="date">
        <div>2021年</div>
        <select id="day" v-model="selectedMonth">
          <option :value="index" v-for="(item, index) in dayList" :key="index">{{ item }}
          </option>
          <Icon name="arrow"/>
        </select>
      </div>
      <div class="displayValue">
        <div>收入</div>
        <div>{{ totalIncome }}</div>
      </div>
      <div class="displayValue">
        <div>支出</div>
        <div>{{ totalOutcome }}</div>
      </div>
    </div>
    <DisplayRecord :selected-month="selectedMonth" :result="result"/>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import NoneNotification from '@/views/NoneNotification.vue';
import DisplayRecord from '@/views/DisplayRecord.vue';

@Component({
  components: {DisplayRecord, NoneNotification, Button},
})
export default class labels extends Vue {
  tagHashTable = this.$store.state.tagHashTable;
  selectedMonth = dayjs().format('M');
  value = '-';
  dayList = {
    1: '1月',
    2: '2月',
    3: '3月',
    4: '4月',
    5: '5月',
    6: '6月',
    7: '7月',
    8: '8月',
    9: '9月',
    10: '10月',
    11: '11月',
    12: '12月'
  };

  get totalIncome(): number | undefined {
    if (this.result.length === 0) {
      return 0;
    }
    const n = this.$store.getters.getRecord({type: '+', selector: 'M'});
    const index = n.findIndex(t =>
        dayjs(t.title).format('M') === this.selectedMonth.toString()
    );
    if (index < 0) {
      return 0;
    }
    let finalResult = 0;
    for (let i = 0; i < n[index].items.length; i++) {
      finalResult = parseFloat(n[index].items[i].number) + finalResult;
    }
    return finalResult;
  }

  get totalOutcome(): number | undefined {
    if (this.result.length === 0) {
      return 0;
    }
    const n = this.$store.getters.getRecord({type: '-', selector: 'M'});
    const index = n.findIndex(t =>
        dayjs(t.title).format('M') === this.selectedMonth.toString()
    );
    if (index < 0) {
      return 0;
    }
    let finalResult = 0;
    for (let i = 0; i < n[index].items.length; i++) {
      finalResult = parseFloat(n[index].items[i].number) + finalResult;
    }
    return finalResult;
  }

  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }

  get result(): any {
    if (this.recordList.length === 0) {
      return [];
    } else if (
        this.recordList.findIndex(t => dayjs(t.date).format('M') === this.selectedMonth.toString())
    ) {
      return [];
    }
    const {recordList} = this;

    const n = clone(recordList.filter(t => dayjs(t.date).format('M') === this.selectedMonth.toString())
        .sort((a, b) =>
            dayjs(b.date).valueOf() - dayjs(a.date).valueOf()));
    const hashTable = [{title: dayjs(n[0].date).format('YYYY-M-D'), items: [n[0]]}];
    for (let i = 1; i <= n.length - 1; i++) {
      const current = n[i];
      const last = hashTable[hashTable.length - 1];
      if (dayjs(current.date).isSame(last.title, 'day')) {
        last.items.push(current);
      } else {
        hashTable.push({title: dayjs(current.date).format('YYYY-M-D'), items: [current]});
      }
    }
    return hashTable;
  }

  beforeCreate(): void {
    this.$store.commit('loadRecords');
  }
}
</script>

<style lang="scss" scoped>
@import "~@/views/style/global.scss";

.contentWrapper {
  display: flex;
  flex-direction: column;

  .title {
    height: 60px;
    text-align: center;
    line-height: 60px;
    background: $color-theme;
    font-size: 26px;
  }

  .overView {
    display: flex;
    background: $color-theme;

    .date {

      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 20px;

      div:first-child {
        color: #8c7d45;
        font-size: 8px;
      }

      select {
        border: none;
        font-size: 24px;
        border-right: 1px solid black;
        background: inherit;
      }
    }

    .displayValue {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 40px;
      padding-right: 20px;

      div:first-child {
        font-size: 8px;
        color: #8c7d45;

      }

      div:last-child {
        font-size: 16px;
      }
    }
  }

  .recordList {
    .recordItem {
      display: block;

    }
  }
}
</style>
