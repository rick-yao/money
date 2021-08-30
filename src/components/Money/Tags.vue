<template>
  <div class="label">
    <ul class="tags">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
    <div class="new">
      <button class="add">新增标签</button>
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'Tags'
};
</script>

<style lang='scss' scoped>

.label {
  padding: 16px;

  .tags {
    display: flex;
    flex-direction: row;
    align-items: center;

    li {
      display: flex;
      justify-content: center;
      margin-right: 3px;
      background: #d4d4d4;
      width: 40px;
      border-radius: 8px 8px;
    }
  }

  .new {
    padding-top: 16px;

    .add {
      color: #999;
      border-bottom: 1px solid;
      padding: 0 3px;
    }
  }
;
}
</style>