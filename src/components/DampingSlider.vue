<template>
  <div>
    <label for="damping-slider">
      Damping
    </label>
    <input
      id="damping-slider"
      v-model.number="engine.damping"
      type="range"
      min="0"
      max="1e-2"
      step="1e-9"
    >
  </div>
</template>

<script lang="js">
import Vue from 'vue';

export default Vue.extend({
    props: {
        engine: Object,
    },
});
</script>
