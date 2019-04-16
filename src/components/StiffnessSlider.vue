<template>
  <div>
    <label for="stiffness-slider">
      Stiffness
    </label>
    <input
      id="stiffness-slider"
      :value="value"
      type="range"
      min="1e-6"
      max="1e-4"
      step="1e-9"
      @input="$emit('input', Number($event.target.value))"
    >
  </div>
</template>

<script lang="ts">
export default {
    props: {
        value: Number,
    },
};
</script>
