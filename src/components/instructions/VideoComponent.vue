<template>
  <div id="video">
    <h1>Video</h1>
    <!-- castMediaElement is a CAF class -->
    <video class="castMediaElement">Your browser doesn't support video.</video>
  </div>
</template>

<script>
export default {
  name: "Video"
};
</script>

<style scoped>
h1,
h2 {
  text-align: center;
}

div#video {
  position: relative;
  display: flex;
  flex-direction: column;
}

div#video video {
  align-self: stretch;
  flex: 1;
  background-color: black;
}
</style>