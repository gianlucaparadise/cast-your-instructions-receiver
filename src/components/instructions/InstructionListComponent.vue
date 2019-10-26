<template>
  <div id="instructions">
    <h1 class="title">{{ title }}</h1>

    <ol>
      <li>Step one</li>
      <li>Step two</li>
      <li>Step three</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "InstructionList",
  props: {
    title: String
  }
};
</script>

<style scoped>
.selected {
  color: red;
  font-weight: bold;
}
</style>