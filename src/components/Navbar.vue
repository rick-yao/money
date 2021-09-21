<template>
  <nav>
    <router-link class="items" active-class="selected" to="/labels">
      <Icon name="label"/>
      明细
    </router-link>
    <router-link class="items" active-class="selected" to="/money">
      <Icon name="money"/>
      记一笔
    </router-link>
    <router-link class="items" active-class="selected" to="/statistics">
      <Icon name="statistics"/>
      图表
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Navbar'
};
</script>

<style lang="scss" scoped>
@import '~@/views/style/global.scss';

nav {
  display: flex;
  box-shadow: 0 0 5px rgb(0, 0, 0, 0.25);
  background: white;


  > .items {
    padding: 2px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    > .goPrevious {
      height: 32px;
      width: 32px;
    }
  }

  .selected {
    color: $color-theme;
  }

}
</style>
