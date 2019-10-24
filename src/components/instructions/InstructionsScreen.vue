<template>
  <div id="main">
    <div id="col-1" class="container">
      <InstructionList class="container" title="Selected routine" />

      <div id="description" class="container">
        <h2>selectedDescription</h2>
      </div>

      <div id="duration" class="container">
        <h3>selectedDuration</h3>
      </div>
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

export default {
  name: "InstructionsScreen",
  components: {
    Countdown,
    InstructionList
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

#col-1 {
  display: flex;
  flex-direction: column;
}

#description {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 50px;
}

#duration {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 50px;
  font-style: italic;
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