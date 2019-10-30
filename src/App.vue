<template>
  <div id="app">
    <SplashScreen :isReady="isReady" />
    <InstructionsScreen v-if="isReady" />
  </div>
</template>

<script>
import "./types";
import { log } from "./logger";
import { delay } from "./utils";
import { store } from "./components/instructions/InstructionsStore";
import InstructionsScreen from "./components/instructions/InstructionsScreen.vue";
import SplashScreen from "./components/SplashScreen.vue";
import { routine as stubbedRoutine } from "./assets/stub/stub-instructions.js";

export default {
  name: "app",
  data: () => ({
    state: store.state
  }),
  computed: {
    isReady: function() {
      return Boolean(this.state.routine);
    }
  },
  watch: {
    "state.presentationState": {
      deep: true,
      handler(val) {
        log(() => `on presentationState change: ${val}`);
      }
    },
    "state.selectedStepIndex": {
      deep: true,
      handler(val) {
        if (val < 0) {
          // When val is -1 I skip it because it's just a state change
          return;
        }
        log(() => `on selected instruction: ${val}`);
      }
    }
  },
  components: {
    InstructionsScreen,
    SplashScreen
  },
  async mounted() {
    // This is to test locally
    await delay(1500);

    log(() => "Loading stub routine");
    store.load(stubbedRoutine);

    await delay(2000);

    log(() => "Playing");
    store.play();
  }
};
</script>

<style>
html {
  height: 100%;
  margin: 0;
}

body {
  height: 100%;
  margin: 0;
  background-color: black;
  color: white;
}

#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1.title,
h2.title {
  text-align: center;
}
</style>
