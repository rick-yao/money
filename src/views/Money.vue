<template>
  <Layout>
    <Tags/>
    <Notes/>
    <Types/>
    <NumberPad/>
  </Layout>
</template>

<script lang="ts">
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';

export default {
  name: 'money',
  components: {NumberPad, Types, Tags, Notes}
};
</script>

<style lang="scss" scoped>
</style>
