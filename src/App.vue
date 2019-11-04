/* global cast */ // this directive is for eslint

<template>
  <div id="app">
    <SplashScreen :isReady="isReady" />
    <InstructionsScreen />
  </div>
</template>

<script>
import "./types";
import { log } from "./logger";
import { delay } from "./utils";
import { store } from "./components/instructions/InstructionsStore";
import { CastReceiver } from "./cast/receiver";
import { Player } from "./cast/player";
import InstructionsScreen from "./components/instructions/InstructionsScreen.vue";
import SplashScreen from "./components/SplashScreen.vue";

/** @type {import('./cast/receiver').CastReceiverListener} */
const receiverListener = {
  onCastEvent: async (eventType, senderId) => {
    if (eventType === "CONNECTED") {
      // I need a little delay before sending back a message on connection otherwise the sender wouldn't get the message
      await delay(1000);
      log(() => `SENDER_CONNECTED: Sending current state to connected device`);

      const routine = store.state.routine;
      const presentationState = store.state.presentationState;
      receiver.sendState(presentationState, routine, senderId);
    }
  },

  onSenderEvent: (type, routine) => {
    const videoName = routine ? routine.instructions[0].videoUrl : "";

    switch (type) {
      case "LOAD":
        store.load(routine);

        player.load(videoName);
        break;

      case "PLAY":
        store.play();
        player.play();
        break;

      case "PAUSE":
        store.pause();
        player.pause();
        break;

      case "STOP":
        store.stop();
        player.stop();
        break;

      default:
        break;
    }
  }
};

const namespace = "urn:x-cast:cast-your-instructions";
const receiver = new CastReceiver(namespace, receiverListener);
const player = new Player();

receiver.start();

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
      /**
       * @param {PresentationState} val New presentation state
       */
      handler(val) {
        log(() => `on presentationState change: ${val}`);
        const appState = val;
        const routine = this.state.routine;
        receiver.sendState(appState, routine);
      }
    },
    "state.selectedStepIndex": {
      deep: true,
      /**
       * @param {number} val New SelectedStepIndex value
       */
      handler(val) {
        if (val < 0) {
          // When val is -1 I skip it because it's just a state change
          return;
        }
        log(() => `on selected instruction: ${val}`);
        const routine = this.state.routine;
        const selectedStepIndex = val;
        receiver.onSelectedInstruction(routine, selectedStepIndex);
      }
    }
  },
  components: {
    InstructionsScreen,
    SplashScreen
  },
  async mounted() {
    // This is to test locally
    const url = new URL(window.location.href);
    if (url.searchParams.get("env") === "stub") {
      const stub = require("./assets/stub/stub-instructions.js");
      const stubbedRoutine = stub.routine;
      await delay(1500);
      log(() => "Loading stub routine");
      receiverListener.onSenderEvent("LOAD", stubbedRoutine);
      await delay(2000);
      log(() => "Playing");
      receiverListener.onSenderEvent("PLAY", stubbedRoutine);
    }
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
