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
              <div class="notes">{{ i.notes }}</div>
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
  @Prop({default: dayjs().format('M')}) selectedMonth !: string;
  @Prop({default: []}) result !: [];
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
    font-size: 18px;

    h3 {
      padding-left: 5px;
    }

    div:last-child {
      padding-right: 5px;
    }

    .itemList {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 3px 0;

      .contentName {
        display: flex;
        align-items: center;
        padding-left: 10px;

        .notes {
          padding-left: 20px;
        }

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