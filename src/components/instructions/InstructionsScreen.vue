<template>
  <div id="main">
    <div id="col-1" class="container">
      <InstructionList class="container" :title="title" :instructions="instructions" />

      <StepDemonstrator
        class="container expand"
        :description="selectedDescription"
        :duration="selectedDuration"
      />
    </div>

    <div class="line vertical"></div>

    <div id="col-2" class="container">
      <Countdown class="container" :countdownTime="countdownTime" />

      <div class="line horizontal"></div>

      <Video class="container" />
    </div>
  </div>
</template>

<script>
import "../../types";
// import { log } from "./../../logger";
import { store } from "./InstructionsStore";
import Countdown from "./CountdownComponent.vue";
import InstructionList from "./InstructionListComponent.vue";
import StepDemonstrator from "./StepDemonstratorComponent.vue";
import Video from "./VideoComponent.vue";

export default {
  name: "InstructionsScreen",
  data: () => ({
    state: store.state
  }),
  computed: {
    title: function() {
      /**
       * @type {Routine}
       */
      const routine = this.state.routine;
      if (!routine) {
        return "";
      }

      return routine.title;
    },
    instructions: function() {
      /**
       * @type {Routine}
       */
      const routine = this.state.routine;
      if (!routine) {
        return [];
      }

      return routine.instructions;
    },
    selectedDescription: function() {
      /**
       * @type {Step}
       */
      const selectedStep = store.getSelectedStep();
      if (!selectedStep) {
        return "";
      }

      return selectedStep.description;
    },
    selectedDuration: function() {
      /**
       * @type {Step}
       */
      const selectedStep = store.getSelectedStep();
      if (!selectedStep) {
        return "";
      }

      return `${selectedStep.countdown} seconds`;
    },
    selectedVideoUrl: function() {
      /**
       * @type {Step}
       */
      const selectedStep = store.getSelectedStep();
      if (!selectedStep) {
        return "";
      }

      return selectedStep.videoUrl;
    },
    countdownTime: function() {
      /**
       * @type {Number}
       */
      const countdownTime = this.state.countdownTime;
      if (countdownTime < 0) {
        return 0;
      }

      return countdownTime;
    }
  },
  methods: {
    // setListener: function(delegate) {
    //   listener = delegate;
    // }
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