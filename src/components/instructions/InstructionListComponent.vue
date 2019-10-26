<template>
  <div id="instructions">
    <h1 class="title">{{ title }}</h1>

    <ol>
      <StepItem name="Step one" />
      <StepItem name="Step two" :selected="true" />
      <StepItem name="Step three" />
    </ol>
  </div>
</template>

<script>
import StepItem from "./StepItemComponent.vue";

export default {
  name: "InstructionList",
  props: {
    title: String
  },
  components: {
    StepItem
  }
};
</script>

<style scoped>
</style>