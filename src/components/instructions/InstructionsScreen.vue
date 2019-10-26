<template>
  <div id="main">
    <div id="col-1" class="container">
      <InstructionList class="container" title="Selected routine" />

      <Step
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
import Countdown from "./CountdownComponent.vue";
import InstructionList from "./InstructionListComponent.vue";
import Step from "./StepComponent.vue";
import Video from "./VideoComponent.vue";

export default {
  name: "InstructionsScreen",
  components: {
    Countdown,
    InstructionList,
    Step,
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