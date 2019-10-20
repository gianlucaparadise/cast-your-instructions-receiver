<template>
  <div :class="{ splash: true, fadeout: isReady }">
    <h1>Cast your Instructions</h1>
    <h2>Select a routine to cast</h2>
  </div>
</template>

<script>
export default {
  name: "SplashScreen",
  props: {
    isReady: Boolean
  }
};
</script>

<style scoped>
.splash {
  background-color: #000000;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.fadeout {
  animation: fadeout 2s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>