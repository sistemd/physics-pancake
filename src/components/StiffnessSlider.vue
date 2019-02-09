<template>
  <div>
    <label for="stiffness-slider">
      Stiffness
    </label>
    <input
      id="stiffness-slider"
      type="range"
      min="1e-6"
      max="1e-4"
      step="1e-9"
      @input="onInput"
      :value="spring.humanReadableStiffness(engine.timestep)"
    >
  </div>
</template>

<script>
export default {
    props: {
        spring: Object,
        engine: Object,
    },
    methods: {
        onInput(event) {
            const { value } = event.target;
            this.spring.setStiffness(value, this.engine.timestep);
        }
    }
};
</script>
