<template>
  <div id="app">
    <SplashScreen :isReady="isReady" />
    <InstructionsScreen v-if="isReady" />
  </div>
</template>

<script>
import InstructionsScreen from "./components/instructions/InstructionsScreen.vue";
import SplashScreen from "./components/SplashScreen.vue";

export default {
  name: "app",
  data: () => ({
    isReady: false
  }),
  components: {
    InstructionsScreen,
    SplashScreen
  },
  mounted() {
    // This is to test locally
    setTimeout(() => {
      this.isReady = true;
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
</style>
