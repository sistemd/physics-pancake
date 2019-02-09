<template>
  <div>
    <label for="damping-slider">
      Damping
    </label>
    <input
      id="damping-slider"
      type="range"
      min="0"
      max="1e-2"
      step="1e-9"
      @input="onInput"
      :value="engine.humanReadableDamping"
    >
  </div>
</template>

<script>
export default {
    props: {
        engine: Object,
    },
    methods: {
        onInput(event) {
            const { value } = event.target;
            this.engine.setDamping(value);
        },
    },
};
</script>
