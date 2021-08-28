<template>
  <div class="money-wrapper">
    <div class="main-money">money</div>
    <Navbar class="nav" />
  </div>
</template>

<script lang="ts">
export default {
  name: "money"
};
</script>

<style lang="scss" scoped>
.money-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-money {
  flex-grow: 1;
}

.nav {
  border: 1px solid green;
}
</style>
