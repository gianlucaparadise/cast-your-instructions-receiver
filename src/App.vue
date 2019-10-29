<template>
  <div id="app">
    <SplashScreen :isReady="isReady" />
    <InstructionsScreen v-if="isReady" />
  </div>
</template>

<script>
import "./types";
import { log } from "./logger";
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
  components: {
    InstructionsScreen,
    SplashScreen
  },
  mounted() {
    // This is to test locally
    setTimeout(() => {
      log(() => "Loading stub routine");
      store.load(stubbedRoutine);

      setTimeout(() => {
        log(() => "Playing");
        store.play();
      }, 2000);
    }, 1500);
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
