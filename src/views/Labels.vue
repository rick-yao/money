<template>
  <layout>
    <router-view/>
    <ol>
      <li></li>
    </ol>
    <button>新建标签</button>
  </layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class labels extends Vue {
}
</script>

<style lang="scss" scoped></style>
