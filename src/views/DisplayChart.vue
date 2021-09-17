<template>
  <div id="myChart" style='width:100vw; height:200px'></div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import * as echarts from 'echarts';
import clone from '@/lib/clone';
import dayjs from 'dayjs';

@Component
export default class DisplayChart extends Vue {
  @Prop({default: '-'}) type!: string;
  @Prop({default: 'M'}) selector !: string;

  beforeCreate(): void {
    this.$store.commit('loadRecords');
  }

  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }

  get result(): any {
    const {recordList} = this;
    if (!recordList) {
      return [];
    }
    const n = clone(recordList.filter(t => t.type === this.type).sort((a, b) =>
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

  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('myChart') as HTMLElement);
    // 绘制图表
    myChart.setOption({
      title: {
        text: this.selector
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  }

}
</script>

<style lang='scss' scoped>

</style>