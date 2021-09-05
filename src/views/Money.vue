<template>
  <Layout :content-prefix="layout">
    <Tags :value.sync="tags" @update:record="updateTags"/>
    <Notes :value.sync="record.notes" name="备注" place-holder="请在此处输入备注"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.number" @update:finalResult="setLocal"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {modelRecord} from '@/models/model-record';
import {tagListModel} from '@/models/model-tag';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';

@Component({
  components: {
    NumberPad, Types, Tags, Notes
  }
})
export default class Money extends Vue {
  layout = 'layout';
  recordList: RecordItem[] = modelRecord.fetch();
  tags = tagListModel.fetch();
  record: RecordItem = {
    type: '-',
    selectedTags: [],
    notes: '',
    number: '0',
  };

  updateTags(e: string[]): void {
    this.record.selectedTags = e;
  }

  setLocal(): void {
    const tmp = modelRecord.clone(this.record);
    tmp.date = new Date();
    this.recordList.push(tmp);
  }

  @Watch('recordList') onRecordListChanged(val: RecordItem[]): void {
    modelRecord.save(val);
  }

}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

</style>
