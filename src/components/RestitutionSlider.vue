<template>
  <div>
    <label for="restitution-slider">
      Restitution
    </label>
    <input
      id="restitution-slider"
      type="range"
      min="0"
      max="0.9"
      step="1e-9"
      @input="onInput"
      :value="terrainElement.humanReadableRestitution(engine.timestep)"
    >
  </div>
</template>

<script>
export default {
    props: {
        terrainElement: Object,
        engine: Object,
    },
    methods: {
        onInput(event) {
            const { value } = event.target;
            this.terrainElement.setRestitution(value, this.engine.timestep);
        }
    },
};
</script>
