<template>
  <div class="types">
    <div class="selected">支出</div>
    <div>收入</div>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'Types'
};
</script>

<style lang='scss' scoped>
.types {
  display: flex;
  background: #c4c4c4;
  text-align: center;

  div {
    width: 50%;
    font-size: 24px;
    line-height: 64px;
    position: relative;
  }

  .selected::after {
    content: '';
    bottom: 0;
    left: 0;
    position: absolute;
    border: 1px solid #333;
    width: 100%;
  }
}
</style>