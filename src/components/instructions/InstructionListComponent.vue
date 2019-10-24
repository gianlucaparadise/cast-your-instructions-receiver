<template>
  <div id="instructions">
    <h1>{{ title }}</h1>

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
h1,
h2 {
  text-align: center;
}

.selected {
  color: red;
  font-weight: bold;
}
</style>