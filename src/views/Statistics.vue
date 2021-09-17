<template>
  <Layout>
    <div class="navbar">
      <select id="type" v-model="value">
        <option value="-">支出</option>
        <option value="+">收入</option>
      </select>
    </div>
    <div class="selection">
      <div>周</div>
      <div>月</div>
      <div>年</div>
    </div>
    <div class="basicStatistics">
      <div>总支出:00000</div>
      <div>平均值:00</div>
    </div>
    <div class="chart">
      <DisplayChart/>
    </div>
    <ul class="displayItem">
      <li v-for="(items, index) in result" :key="index">
        <h3>{{ beautify(items.title) }}</h3>
        <ul>
          <li class="itemList" v-for="i in items.items" :key="i.number">
            <div>{{ i.date }}</div>
            <div>${{ i.number }}</div>
          </li>
        </ul>
      </li>
    </ul>
  </Layout>
</template>

<script lang="ts">
import Types from '@/components/Money/Types.vue';
import Vue from 'vue';
import dayjs from 'dayjs';
import {Component} from 'vue-property-decorator';
import clone from '@/lib/clone';
import DisplayChart from '@/views/DisplayChart.vue';

@Component({
  components: {DisplayChart, Types}
})
export default class Statistics extends Vue {
  value = '-';

  beforeCreate(): void {
    this.$store.commit('loadRecords');
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
    if (!recordList) {
      return [];
    }
    const n = clone(recordList.filter(t => t.type === this.value).sort((a, b) =>
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
}
</script>

<style lang="scss" scoped>
@import "~@/views/style/global.scss";

.chart {
  width: 100vw;
  height: 200px;
  display: flex;
  justify-content: center;
}

.navbar {
  display: flex;
  justify-content: center;
  background: $color-theme;
  padding-top: 18px;
  padding-bottom: 8px;

  select {
    font-size: 20px;
    border: none;
    background: $color-theme;
  }
}

.selection {
  background: $color-theme;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;

  div:first-child {
    border: 1px solid black;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  div:last-child {
    border: 1px solid black;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  div:nth-child(2) {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  div {
    padding: 2px 50px;
  }
}

.basicStatistics {
  display: flex;
  flex-direction: column;
  color: #7d7d7d;
  box-shadow: 0 0 3px #7d7d7d;

  div:first-child {
    padding-top: 10px;
    font-size: 16px;
  }

  div:last-child {
    padding-bottom: 10px;
    font-size: 6px;
  }

  div {
    padding: 1px 20px;
  }

}

.displayItem {
  > li {
    padding: 10px 0;

    .itemList {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
