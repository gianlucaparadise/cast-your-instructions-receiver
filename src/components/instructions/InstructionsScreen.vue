<template>
  <div id="main">
    <div id="col-1" class="container">
      <InstructionList class="container" :title="title" :instructions="instructions" />

      <StepDemonstrator
        class="container expand"
        description="Selected description"
        duration="Selected duration"
      />
    </div>

    <div class="line vertical"></div>

    <div id="col-2" class="container">
      <Countdown class="container" :countdownTime="0" />

      <div class="line horizontal"></div>

      <Video class="container" />
    </div>
  </div>
</template>

<script>
import "../../types";
import Countdown from "./CountdownComponent.vue";
import InstructionList from "./InstructionListComponent.vue";
import StepDemonstrator from "./StepDemonstratorComponent.vue";
import Video from "./VideoComponent.vue";

export default {
  name: "InstructionsScreen",
  props: {
    /**
     * @type {Routine}
     */
    routine: {}
  },
  computed: {
    title: function() {
      /**
       * @type {Routine}
       */
      const routine = this.routine;
      if (!routine) {
        return "";
      }

      return routine.title;
    },
    instructions: function() {
      /**
       * @type {Routine}
       */
      const routine = this.routine;
      if (!routine) {
        return [];
      }

      return routine.instructions;
    }
  },
  components: {
    Countdown,
    InstructionList,
    StepDemonstrator,
    Video
  }
};
</script>

<style scoped>
#main {
  display: flex;
  height: 100%;
  flex-direction: row;
}

#main > div.container {
  max-width: 50%;
  width: 50%;
}

.container.expand {
  flex-grow: 1;
}

#col-1 {
  display: flex;
  flex-direction: column;
}

#col-2 {
  display: flex;
  flex-direction: column;
}

#col-2 > div.container {
  max-height: 50%;
  height: 50%;
}

.line {
  background-color: white;
}

.line.vertical {
  width: 10px;
}

.line.horizontal {
  height: 10px;
}
</style>