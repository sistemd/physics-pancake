<template>
  <div>
    <label for="restitution-slider">
      Restitution
    </label>
    <input
      id="restitution-slider"
      v-model="terrainElement.restitution"
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
        terrainElement: {
            type: Object,
            default: undefined,
        },
    },
};
</script>
