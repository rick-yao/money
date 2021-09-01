<template>
  <Layout>
    <Tags :value.sync="allTags"/>
    <Notes/>
    <Types :sec-type.sync="selectedType"/>
    <NumberPad/>
  </Layout>
</template>

<script lang="ts">
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component} from 'vue-property-decorator';
import Vue from 'vue';

@Component({
  components: {
    NumberPad, Types, Tags, Notes
  }
})
export default class Money extends Vue {
  selectedType = '-';
  allTags: string[] = ['衣', '食', '住', '行',];

}
</script>

<style lang="scss" scoped>
</style>
