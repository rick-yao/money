<template>
  <div id="myChart" style='width:100vw; height:200px'></div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts';
import clone from '@/lib/clone';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekdays: [
    '周日', '周一', '周二', '周三', '周四', '周五', '周六'
  ]
});
dayjs.updateLocale('en', {
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
})
;

@Component
export default class DisplayChart extends Vue {
  @Prop({default: '+'}) type!: string;
  @Prop({default: 'M'}) selector !: string;

  beforeCreate(): void {
    this.$store.commit('loadRecords');
  }

  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }

  get result(): any {
    const recordList = this.recordList;
    if (!recordList) {
      return {};
    }
    const selectHastTable = {
      M: 'YYYY-MM',
      Y: 'YYYY',
    };
    const queryHashTable = {
      M: 'month' as const,
      Y: 'year' as const,
    };
    const n = clone(
        recordList
            .filter((t) => t.type === this.type)
            .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
    );
    if (this.selector === 'M' || this.selector === 'Y') {
      const hashTable: { title: string; items: RecordItem[] }[] = [
        {
          title: dayjs(n[0].date).format(selectHastTable[this.selector]),
          items: [n[0]],
        },
      ];
      for (let i = 1; i <= n.length - 1; i++) {
        const current = n[i];
        const last = hashTable[hashTable.length - 1];
        if (
            dayjs(current.date).isSame(last.title, queryHashTable[this.selector])
        ) {
          last.items.push(current);
        } else {
          hashTable.push({
            title: dayjs(current.date).format(selectHastTable[this.selector]),
            items: [current],
          });
        }
      }
      return hashTable;
    }
    if (this.selector === 'W') {
      const tmp = n.filter((t) =>
          dayjs().subtract(7, 'day').isBefore(dayjs(t.date))
      );
      const hashTable = [
        {
          title: dayjs(tmp[0].date).format('YYYY-MM-DD'),
          items: [tmp[0]],
        },
      ];

      for (let i = 1; i <= tmp.length - 1; i++) {
        const current = tmp[i];
        const last = hashTable[hashTable.length - 1];
        if (dayjs(current.date).isSame(last.title, 'day')) {
          last.items.push(current);
        } else {
          hashTable.push({
            title: dayjs(current.date).format('YYYY-MM-DD'),
            items: [current],
          });
        }
      }
      return hashTable;
    }

  }

  // get dataSet() {
  //   if (this.selector === 'M') {
  //
  //   }
  //
  // }

  get xSelected(): string[] {
    if (this.selector === 'M') {
      let n: string[] = [];
      for (let i = 0; i < 12; i++) {
        n.push(dayjs().subtract(i, 'month').format('MMMM'));
      }
      return n.reverse();
    } else {
      let n: string[] = [];
      for (let i = 0; i < 7; i++) {
        n.push(dayjs().subtract(i, 'day').format('dddd'));
      }
      return n.reverse();
    }
  }

  get listedNumber(): number[] {
    const tmp = clone(this.xSelected);
    const x = tmp.reverse();
    const {result} = this;
    if (this.selector === 'W') {
      const n = [0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < result.length; i++) {
        if (x.indexOf(dayjs(result[i].title).format('dddd')) >= 0) {
          let index = x.indexOf(dayjs(result[i].title).format('dddd'));
          for (let j = 0; j < this.result[i].items.length; j++) {
            n[index] = Math.abs(parseFloat(this.result[i].items[j].number)) + n[index];
          }
        }
      }
      return n.reverse();
    } else {
      const n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < result.length; i++) {
        if (x.indexOf(dayjs(result[i].title).format('MMMM')) >= 0) {
          let index = x.indexOf(dayjs(result[i].title).format('MMMM'));
          for (let j = 0; j < this.result[i].items.length; j++) {
            n[index] = Math.abs(parseFloat(this.result[i].items[j].number)) + n[index];
          }
        }
      }
      return n.reverse();
    }
  }

  @Watch('selector') onSelectorChange(): void {
    this.display();
  }

  @Watch('type') onTypeChange(): void {
    this.display();
  }

  mounted(): void {
    this.display();
  }

  display(): void {
    const x = this.xSelected;
    const y = this.listedNumber;
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('myChart') as HTMLElement);
    // 绘制图表
    myChart.setOption({
      title: {
        text: ''
      },
      tooltip: {},
      xAxis: {
        data: x
      },
      yAxis: {},
      series: [
        {
          type: 'line',
          data: y
        }
      ]
    });
  }

}
</script>

<style lang='scss' scoped>

</style>