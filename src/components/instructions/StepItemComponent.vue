<template>
  <li v-bind:class="{ selected: selected }">{{ name }}</li>
</template>

<script>
export default {
  name: "StepItem",
  props: {
    selected: Boolean,
    name: String
  }
};
</script>

<style scoped>
.selected {
  color: red;
  font-weight: bold;
}
</style>