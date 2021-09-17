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
        <div>0.00</div>
      </div>
      <div class="displayValue">
        <div>支出</div>
        <div>0.00</div>
      </div>
    </div>
    <ul class="displayItem">
      <li v-for="(items, index) in result" :key="index">
        <h3>{{ beautify(items.title) }}</h3>
        <ul>
          <li class="itemList" v-for="i in items.items" :key="i.date">
            <div class="contentName">
              <Icon :name="i.selectedTags.toString()"/>
              <div>{{ tagHashTable[i.selectedTags.toString()] }}</div>
            </div>
            <div>{{ i.number }}</div>
          </li>
        </ul>
      </li>
    </ul>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Button, Icon},
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

  mounted() {
    console.log(this.$store.getters.getRecord({type: '-', selector: 'W'}));
  }

  beautify(day: string): string {
    const now = dayjs();
    if (dayjs(day).isSame(now, 'day')) {
      return '今天';
    } else if (dayjs(day).isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else {
      return day;
    }
  }

  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }

  get result(): any {
    const {recordList} = this;
    const n = clone(recordList
        // .filter(t => dayjs(t.date).format('M') === this.selected)
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

  .displayItem {
    > li {
      padding: 10px 0;

      h3 {
        padding-left: 5px;
      }

      div:last-child {
        padding-right: 5px;
      }

      .itemList {
        display: flex;
        justify-content: space-between;
        padding: 3px 0;

        .contentName {
          display: flex;
          align-items: center;
          padding-left: 10px;

          .goPrevious {
            width: 40px;
            height: 40px;
            padding-right: 3px;
          }
        }
      }
    }
  }
}
</style>
