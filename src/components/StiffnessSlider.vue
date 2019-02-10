<template>
  <div>
    <label for="stiffness-slider">
      Stiffness
    </label>
    <input
      id="stiffness-slider"
      :value="value"
      @input="$emit('input', Number($event.target.value))"
      type="range"
      min="1e-6"
      max="1e-4"
      step="1e-9"
    >
  </div>
</template>

<script>
export default {
    props: {
        value: Number,
    },
};
</script>
