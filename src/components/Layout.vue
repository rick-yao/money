<template>
  <div class="wrapper">
    <div class="main-content" :class="`${contentPrefix}-content`">
      <slot/>
    </div>
    <Navbar class="nav"/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
  props: ['contentPrefix']
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex-grow: 1;
}

</style>
