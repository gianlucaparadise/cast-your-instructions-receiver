<template>
  <div id="instructions">
    <h1 class="title">{{ title }}</h1>

    <ol>
      <StepItem v-for="(step) in instructions" :key="step.name" :name="step.name" />
    </ol>
  </div>
</template>

<script>
import "../../types";
import StepItem from "./StepItemComponent.vue";

export default {
  name: "InstructionList",
  props: {
    /**
     * @type {String}
     */
    title: String,
    /**
     * @type {Step[]}
     */
    instructions: Array
  },
  components: {
    StepItem
  }
};
</script>

<style scoped>
</style>