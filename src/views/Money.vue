<template>
  <Layout>
    <Tags :value.sync="tags" @update:record="updateTags"/>
    <Notes :value.sync="record.notes"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.number" @update:finalResult="setLocal"/>
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';
import Vue from 'vue';
import {parse} from '@typescript-eslint/parser';

type Record = {
  type: string
  selectedTags: string[]
  notes: string
  number: string

}
@Component({
  components: {
    NumberPad, Types, Tags, Notes
  }
})
export default class Money extends Vue {
  recordList: Record = [];
  tags = ['衣', '食', '住', '行',];
  record: Record = {
    type: '-',
    selectedTags: [],
    notes: '',
    number: '0',
  };

  updateTags(e: string) {
    this.record.selectedTags = e;
  }

  setLocal() {
    const tmp = JSON.parse(JSON.stringify(this.record));
    this.recordList.push(tmp);
  }

  @Watch('recordList') onrecordlistchanged(val: Record) {
    window.localStorage.setItem('FinalResult', JSON.stringify(val));
  }

}
</script>

<style lang="scss" scoped>
</style>
