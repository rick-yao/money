<template>
  <div>
    <ul class="displayItem" :class="result.length === 0 && 'hidden'">
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
    <NoneNotification class="notificationWrapper" :class="result.length === 0 && 'showNotification'"/>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';
import NoneNotification from '@/views/NoneNotification.vue';

@Component({
  components: {NoneNotification}
})
export default class DisplayRecord extends Vue {
  @Prop(String) selectedMonth !: string;
  @Prop(Array) result !: [];
  tagHashTable = this.$store.state.tagHashTable;

  beautify(day: string): string | null {
    if (day == undefined) {
      return null;
    }
    const now = dayjs();
    if (dayjs(day).isSame(now, 'day')) {
      return '今天';
    } else if (dayjs(day).isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else {
      return day;
    }
  }

  // get recordList(): RecordItem[] {
  //   return this.$store.state.recordList;
  // }

  // get result(): any {
  //   if (this.recordList.length === 0) {
  //     return [];
  //   } else if (
  //       this.recordList.findIndex(t => dayjs(t.date).format('M') === this.selectedMonth.toString())
  //   ) {
  //     return null;
  //   }
  //   const {recordList} = this;
  //
  //   const n = clone(recordList.filter(t => dayjs(t.date).format('M') === this.selectedMonth.toString())
  //       .sort((a, b) =>
  //           dayjs(b.date).valueOf() - dayjs(a.date).valueOf()));
  //   const hashTable = [{title: dayjs(n[0].date).format('YYYY-M-D'), items: [n[0]]}];
  //   for (let i = 1; i <= n.length - 1; i++) {
  //     const current = n[i];
  //     const last = hashTable[hashTable.length - 1];
  //     if (dayjs(current.date).isSame(last.title, 'day')) {
  //       last.items.push(current);
  //     } else {
  //       hashTable.push({title: dayjs(current.date).format('YYYY-M-D'), items: [current]});
  //     }
  //   }
  //   return hashTable;
  // }

}
</script>

<style lang='scss' scoped>
.notificationWrapper {
  display: none;

  &.showNotification {
    display: flex;
  }
}

.displayItem {
  &.hidden {
    display: none;
  }

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

</style>