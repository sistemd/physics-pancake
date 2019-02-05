<template>
  <div>
    <label for="length-slider">
      Length
    </label>
    <input
      id="length-slider"
      type="range"
      :value="value"
      @input="$emit('input', $event.target.value)"
      min="0.2"
      max="4"
      step="1e-9"
    >
  </div>
</template>

<script>
export default {
    props: ['value'],
};
</script>
