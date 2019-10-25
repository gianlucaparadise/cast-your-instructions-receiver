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

      <div id="video" class="container">
        <h1>Video</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from "./CountdownComponent.vue";
import InstructionList from "./InstructionListComponent.vue";
import Step from "./StepComponent.vue";

export default {
  name: "InstructionsScreen",
  components: {
    Countdown,
    InstructionList,
    Step
  }
};
</script>

<style scoped>
h1,
h2 {
  text-align: center;
}

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

div#video {
  position: relative;
  display: flex;
  flex-direction: column;
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