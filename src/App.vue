<template>
  <div id="app">
    <SplashScreen :isReady="isReady" />
    <HelloWorld v-if="!isLoading" msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import SplashScreen from "./components/SplashScreen.vue";

export default {
  name: "app",
  data: () => ({
    isReady: false
  }),
  components: {
    HelloWorld,
    SplashScreen
  },
  mounted() {
    setTimeout(() => {
      this.isReady = true;
    }, 1500);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
</style>
