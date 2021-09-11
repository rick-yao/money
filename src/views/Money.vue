<template>
  <Layout :content-prefix="layout">
    <Tags :value.sync="tags" @update:record="updateTags"/>
    <Notes :value.sync="record.notes" name="备注" place-holder="请在此处输入备注"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.number" @update:finalResult="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {
    NumberPad, Types, Tags, Notes
  }
})
export default class Money extends Vue {
  layout = 'layout';
  tags = this.$store.state.tagList;
  //record 为初始值，所有的变化也都从组建中传到这里2
  record: RecordItem = {
    type: '-',
    selectedTags: [],
    notes: '',
    number: '0',
  };

  beforeCreate(): void {
    this.$store.commit('loadRecords');
  }

  updateTags(e: string[]): void {
    this.record.selectedTags = e;
  }

  saveRecord(): void {
    this.$store.commit('createRecord', this.record);
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
