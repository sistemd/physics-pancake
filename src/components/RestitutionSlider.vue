<template>
  <div>
    <label for="restitution-slider">
      Restitution
    </label>
    <input
      id="restitution-slider"
      @input="$emit('input', Number($event.target.value))"
      :value="value"
      type="range"
      min="0"
      max="0.9"
      step="1e-9"
    >
  </div>
</template>

<script>
export default {
    props: {
        value: Number,
        terrainElement: Object,
    },
};
</script>
