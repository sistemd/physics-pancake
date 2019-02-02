<template>
  <div>
    <label for="damping-slider">
      Damping
    </label>
    <input
      id="damping-slider"
      v-model="simulation.engine.damping"
      type="range"
      min="0"
      max="1e-2"
      step="1e-9"
    >
  </div>
</template>

<script>
export default {
    props: {
        simulation: {
            type: Object,
            default: null,
        },
    },
};
</script>
