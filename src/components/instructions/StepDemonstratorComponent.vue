<template>
  <div id="step">
    <div id="description">
      <h2>{{ description }}</h2>
    </div>

    <div id="duration">
      <h3>{{ duration }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepDemonstrator",
  props: {
    description: String,
    duration: String
  }
};
</script>

<style scoped>
#step {
  display: flex;
  flex-flow: column nowrap;
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
</style>