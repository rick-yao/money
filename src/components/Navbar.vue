<template>
  <nav>
    <router-link class="items" active-class="selected" to="/money">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link class="items" active-class="selected" to="/labels">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link class="items" active-class="selected" to="/statistics">
      <Icon name="statistics"/>
      数据
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Navbar'
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  box-shadow: 0 0 5px rgb(0, 0, 0, 0.25);

  > .items {
    width: 33.3333333%;
    padding: 2px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .goPrevious {
      height: 32px;
      width: 32px;
    }
  }

  .selected {
    color: darkorange;
  }
}
</style>
