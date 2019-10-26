<template>
  <div id="countdown">
    <h1 class="title">Countdown</h1>
    <span id="countdownTime">{{ countdownTime }}</span>
  </div>
</template>

<script>
export default {
  name: "Countdown",
  props: {
    countdownTime: Number
  }
};
</script>

<style scoped>
#countdown {
  display: flex;
  flex-direction: column;
}

#countdownTime {
  flex-grow: 1;
  font-size: 25vh;
  text-align: center;
}
</style>