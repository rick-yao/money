<template>
  <Layout :content-prefix="layout">
    <Tags :value.sync="tags" @update:record="updateTags"/>
    <Notes :value.sync="record.notes"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.number" @update:finalResult="setLocal"/>
  </Layout>
</template>

<script lang="ts">
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';
import Vue from 'vue';
import {model} from '@/model';


@Component({
  components: {
    NumberPad, Types, Tags, Notes
  }
})
export default class Money extends Vue {
  layout = 'layout';
  recordList: RecordItem[] = model.fetch();
  tags = ['衣', '食', '住', '行',];
  record: RecordItem = {
    type: '-',
    selectedTags: [],
    notes: '',
    number: '0',
  };

  updateTags(e: string[]) {
    this.record.selectedTags = e;
  }

  setLocal() {
    const tmp = model.clone(this.record);
    tmp.date = new Date();
    this.recordList.push(tmp);
  }

  @Watch('recordList') onrecordlistchanged(val: RecordItem[]) {
    model.save(this.recordList);
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
