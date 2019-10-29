<template>
  <div id="instructions">
    <h1 class="title">{{ title }}</h1>

    <ol>
      <StepItem
        v-for="(step, index) in instructions"
        :key="step.name"
        :name="step.name"
        :selected="isSelected(index)"
      />
    </ol>
  </div>
</template>

<script>
import "../../types";
import { store } from "./InstructionsStore";
import StepItem from "./StepItemComponent.vue";

export default {
  name: "InstructionList",
  data: () => ({
    state: store.state
  }),
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
  methods: {
    /**
     * @param {Number} index
     */
    isSelected: function(index) {
      return this.state.selectedStepIndex === index;
    }
  },
  components: {
    StepItem
  }
};
</script>

<style scoped>
</style>