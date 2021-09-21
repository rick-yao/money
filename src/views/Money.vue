<template>
  <div class="layout">
    <Types :value.sync="record.type"/>
    <Tags :value.sync="tags" @update:record="updateTags" class="tags" :type="record.type"/>
    <div class="fixedLayout">
      <Notes :value.sync="record.notes" name="备注" place-holder="请在此处输入备注"/>
      <NumberPad :value.sync="record.number" @update:finalResult="saveRecord"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component} from 'vue-property-decorator';
import GenerateID from '@/lib/IdGenerator';

@Component({
  components: {
    NumberPad, Types, Tags, Notes
  }
})
export default class Money extends Vue {
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
    if (this.record.selectedTags.length === 0) {
      this.record.selectedTags.push('empty');
    }
    this.record.id = GenerateID();
    this.$store.dispatch('createRecord', this.record);
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;

  .fixedLayout {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw
  }

}

</style>
