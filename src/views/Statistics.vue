<template>
  <Layout>
    <Types :value.sync="value"/>
    <ul class="displayItem">
      <li v-for="(items, index) in result" :key="index">
        <h3>{{ beautify(items.title) }}</h3>
        <ul>
          <li class="itemList" v-for="i in items.items" :key="i">
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

@Component({
  components: {Types}
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

  get result(): { title: string, items: RecordItem[] }[] {
    const {recordList} = this;
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
